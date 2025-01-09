import { Request, Response } from "express";
import { OrderModel } from "../models/Order";
import { NotFoundError } from "../exceptions/errors";
import mongoose from "mongoose";
import Stripe from "stripe";
import dotenv from "dotenv";
import { ApiResponse } from "../apiResponse/ApiResponse";

dotenv.config();

// Check if stripe secret is there
if (!process.env.STRIPE_SECRET) throw new Error("No stripe secret provided");

const stripe = new Stripe(process.env.STRIPE_SECRET);

export const createCheckoutSession = async (req: Request, res: Response) => {
  const { products } = req.body;

  const lineItems = products.map((product: any) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name,
        images: [product.image],
      },

      unit_amount: Math.round(product.price * 100),
    },

    quantity: product.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "",
    cancel_url: "",
  });

  // how to determine that the payment went successful or failed

  res.json({ id: session.id });
};

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const {
      carName,
      totalPrice,
      carImageName,
      carImageCloudId,
      carImageCloudUrl,
      carQuantity,
      orderStatus,
      userEmail,
      userPhoneNumber,
    } = req.body;

    const toBePlaced = new OrderModel({
      carName,
      totalPrice,
      carImageName,
      carImageCloudId,
      carImageCloudUrl,
      carQuantity,
      orderStatus,
      userEmail,
      userPhoneNumber,
    });

    const placedOrder = await toBePlaced.save();

    return res
      .status(201)
      .json(new ApiResponse("Order placed successfully", placedOrder));
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json(new ApiResponse(validationErrors[0], null));
    } else if (error instanceof Error) {
      return res.status(500).json(new ApiResponse(error.message, null));
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
      return res.status(500).json(new ApiResponse(error.message, null));
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
      return res.status(500).json(new ApiResponse(error.message, null));
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
      return res.status(500).json(new ApiResponse(error.message, null));
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
      return res.status(500).json(new ApiResponse(error.message, null));
    }
  }
};

export const deleteOrders = async (req: Request, res: Response) => {
  try {
    await OrderModel.deleteMany();
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
