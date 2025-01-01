import { model, Schema } from "mongoose";
import { ISubscription } from "../types";

const subscriptionSchema = new Schema<ISubscription>({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },

  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },

  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    min: [10, "Password must be at least 10 characters"],
  },

  phoneNumber: {
    type: String,
    required: [true, "Phone Number is required"],
  },

  profilePhoto: {
    type: String,
    required: [true, "Profile Photo is required"],
  },
});

export const SubscriptionModel = model<ISubscription>(
  "SubscriptionModel",
  subscriptionSchema
);
