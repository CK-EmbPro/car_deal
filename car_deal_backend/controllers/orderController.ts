import { Request, Response } from "express";
import { OrderModel } from "../models/Order";
import { BadRequestError, NotFoundError } from "../exceptions/errors";
import mongoose from "mongoose";
import Stripe from "stripe";
import dotenv from "dotenv";
import { ApiResponse } from "../apiResponse/ApiResponse";
import { IOrder } from "../types";
import { ORDER_STATUS } from "../constants/orderStatus";
import { join } from "path";

dotenv.config();

// Check if stripe secret is there
if (!process.env.STRIPE_SECRET) throw new Error("No stripe secret provided");

const stripeInstance = new Stripe(process.env.STRIPE_SECRET);
const FRONTEND_URL = process.env.FRONTEND_URL

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const products: IOrder[] = req.body;

    if (!products) throw new BadRequestError("No products to order");

    // Create line items for stripe checkout
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.carName,
          images: [product.carImageCloudUrl],
        },
        unit_amount: Math.round(product.totalPrice * 100),
      },

      quantity: product.carQuantity,
    }));

    // Create stripe checkout session
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${FRONTEND_URL}/success_url`,
      cancel_url: `${FRONTEND_URL}/cancel_url`,
      metadata: {
        orderDetails: JSON.stringify(products),
      },
    });

    return res
      .status(201)
      .json(
        new ApiResponse("Checkout session created successfully", {
          sessionId: session.id,
        })
      );
  } catch (error) {
    if (error instanceof BadRequestError) {
      return res.status(400).json(new ApiResponse(error.message, null));
    } else if (error instanceof Error) {
      return res.status(400).json(new ApiResponse(error.message, null));
    }
  }
};

// Handler for payment webhook and placing orders
export const makePaymentAndOrder = async (req: Request, res: Response) => {
  try {
    const stripeSignature = req.headers['stripe-signature'];
    const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    // Check if stripeSignature is there 
    if(!stripeSignature) throw new NotFoundError("Stripe signature is required")

    // Check if the stripe webhook secret is there
    if(!stripeWebhookSecret) throw new NotFoundError("Stripe webhook secret not provided");

    // Create payment event from the webhook
    const event = stripeInstance.webhooks.constructEvent(
      req.body,
      stripeSignature,
      stripeWebhookSecret
    )

    if(event.type === "checkout.session.completed"){
      const session = event.data.object as Stripe.Checkout.Session
      const orderDetails:IOrder[] = JSON.parse(session.metadata?.orderDetails || '[]')

      // Create APPROVED orders
      await Promise.all(
        orderDetails.map(async({
          carName,
          totalPrice,
          carImageName,
          carImageCloudId,
          carImageCloudUrl,
          carQuantity,
          userEmail,
          userPhoneNumber,
        })=>{
          const order = new OrderModel({
            carName,
            totalPrice,
            carImageName,
            carImageCloudId,
            carImageCloudUrl,
            carQuantity,
            orderStatus: ORDER_STATUS.APPROVED,
            userEmail,
            userPhoneNumber,
          })

          await order.save()

          return res.status(201).json(new ApiResponse("Payment made successfully", null))

        })
      )
    }else if(event.type === "checkout.session.expired"){
      const session = event.data.object as Stripe.Checkout.Session
      const orderDetails:IOrder[] = JSON.parse(session.metadata?.orderDetails || '[]')

      await Promise.all(
        orderDetails.map(async({
          carName,
          totalPrice,
          carImageName,
          carImageCloudId,
          carImageCloudUrl,
          carQuantity,
          userEmail,
          userPhoneNumber})=>{
            const order = new OrderModel({
              carName,
              totalPrice,
              carImageName,
              carImageCloudId,
              carImageCloudUrl,
              carQuantity,
              orderStatus: ORDER_STATUS.REJECTED,
              userEmail,
              userPhoneNumber
            })

            await order.save()

            return res.status(201).json(new ApiResponse("Payment failed", null))

        })
      )
    }

    
  } catch (error) { 
    if(error instanceof NotFoundError){
      return res.status(404).json(new ApiResponse(error.message,null))
    }else if(error instanceof mongoose.Error.ValidationError){
      const validationErrors = Object.values(error.errors).map(err => err.message)
      return res.status(400).json(new ApiResponse(validationErrors[0], null))
    }else if (error instanceof Error){
      return res.status(400).json(new ApiResponse(error.message,null))
    }
  }
};

export const updatedOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const updatedOrderData = req.body;

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      updatedOrderData
    );

    if (!updatedOrder) throw new NotFoundError("Order not found");

    return res
      .status(200)
      .json(new ApiResponse("Order updated successfully", updatedOrder));
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json(new ApiResponse(error.message, null));
    } else if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json(new ApiResponse(validationErrors[0], null));
    } else if (error instanceof Error) {
      return res.status(400).json(new ApiResponse(error.message, null));
    }
  }
};

export const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const order = await OrderModel.findById(orderId);

    if (!order) throw new NotFoundError("Order not found");

    return res
      .status(200)
      .json(new ApiResponse("Order retrieved successfully", order));
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json(new ApiResponse(error.message, null));
    } else if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json(new ApiResponse(validationErrors[0], null));
    } else if (error instanceof Error) {
      return res.status(400).json(new ApiResponse(error.message, null));
    }
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderModel.find();
    return res
      .status(200)
      .json(new ApiResponse("Orders retrieved successfully", orders));
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json(new ApiResponse(error.message, null));
    } else if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json(new ApiResponse(validationErrors[0], null));
    } else if (error instanceof Error) {
      return res.status(400).json(new ApiResponse(error.message, null));
    }
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const deletedOrder = await OrderModel.findByIdAndDelete(orderId);

    if (!deletedOrder) throw new NotFoundError("Order not found");

    return res
      .status(200)
      .json(new ApiResponse("Order deleted successfully", null));
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json(new ApiResponse(error.message, null));
    } else if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json(new ApiResponse(validationErrors[0], null));
    } else if (error instanceof Error) {
      return res.status(400).json(new ApiResponse(error.message, null));
    }
  }
};

export const deleteOrders = async (req: Request, res: Response) => {
  try {
    await OrderModel.deleteMany();
    return res
      .status(200)
      .json(new ApiResponse("Orders deleted successfully", null));
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json(new ApiResponse(validationErrors[0], null));
    } else if (error instanceof Error) {
      return res.status(400).json(new ApiResponse(error.message, null));
    }
  }
};
