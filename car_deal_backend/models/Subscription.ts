import { model, Schema } from "mongoose";
import { ISubscription } from "../types";

const subscriptionSchema = new Schema<ISubscription>({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },

  phoneNumber: {
    type: String,
    required: [true, "Phone Number is required"],
  },

  profilePhotoName: {
    type: String,
    required: [true, "Profile Photo is required"],
  },

  profilePhotoCloudId: {
    type: String,
    required: [true, "Profile Photo is required"],
  },

  profilePhotoCloudUrl: {
    type: String,
    required: [true, "Profile Photo is required"],
  },
});

export const SubscriptionModel = model<ISubscription>(
  "SubscriptionModel",
  subscriptionSchema
);
