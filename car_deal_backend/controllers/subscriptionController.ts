import { Request, Response } from "express";
import { SubscriptionModel } from "../models/Subscription";
import mongoose from "mongoose";
import { NotFoundError } from "../exceptions/errors";
import { emailSender } from "../utils/emailSender";
import { EMAIL_CONTEXT } from "../constants/emailContext";
import { ApiResponse } from "../apiResponse/ApiResponse";

export const addSubscription = async (req: Request, res: Response) => {
  try {
    const {
      email,
      phoneNumber,
      profilePhotoName,
      profilePhotoCloudId,
      profilePhotoCloudUrl,
    } = req.body;

    const userToSubscribe = new SubscriptionModel({
      email,
      phoneNumber,
      profilePhotoName,
      profilePhotoCloudId,
      profilePhotoCloudUrl,
    });

    const subscribedUser = await userToSubscribe.save();
    // Send email to user who subscribed
    emailSender({
      emailContext: EMAIL_CONTEXT.SUBSCRIPTION,
      subscriberEmail: email,
    });

    return res
      .status(201)
      .json(new ApiResponse("Subscribed successfully", subscribedUser));
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

export const updateSubscription = async (req: Request, res: Response) => {
  try {
    const updatedSubscriptionData = req.body;
    const { susbscriptionId } = req.params;

    const updatedSubscription = await SubscriptionModel.findByIdAndUpdate(
      susbscriptionId,
      updatedSubscriptionData,
      { new: true }
    );

    if (!updatedSubscription) throw new NotFoundError("Subscription not found");

    return res
      .status(200)
      .json(
        new ApiResponse(
          "Updated subscription successfully",
          updatedSubscription
        )
      );
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

export const getSingleSubscription = async (req: Request, res: Response) => {
  try {
    const { subscriptionId } = req.params;
    const subscription = await SubscriptionModel.findById(subscriptionId);

    if (!subscription) throw new NotFoundError("Subscription not found");

    return res
      .status(200)
      .json(
        new ApiResponse("Subscription retreived successfully", subscription)
      );
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

export const getSubscriptions = async (req: Request, res: Response) => {
  try {
    const subscriptions = await SubscriptionModel.find();
    return res
      .status(200)
      .json(
        new ApiResponse(
          "All Subscriptions retrieved successfully",
          subscriptions
        )
      );
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

export const deleteSingleSubscription = async (req: Request, res: Response) => {
  try {
    const { subscriptionId } = req.params;
    const deletedSubscription = await SubscriptionModel.findByIdAndDelete(
      subscriptionId
    );
    if (deletedSubscription) throw new NotFoundError("Subscripton not found");

    return res
      .status(200)
      .json(new ApiResponse("Subscription deleted successfully", null));
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

export const deleteSubscriptions = async (req: Request, res: Response) => {
  try {
    await SubscriptionModel.deleteMany();
  } catch (error) {
     if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json(new ApiResponse(validationErrors[0], null));
    }else if (error instanceof Error) {
      return res.status(400).json(new ApiResponse(error.message, null));
    }
  }
};
