import { model, Schema } from "mongoose";
import { IOrder } from "../types";
import { ORDER_STATUS } from "../constants/orderStatus";

const orderSchema = new Schema<IOrder>({
  carName: {
    type: String,
    required: [true, "car name required"],
  },
  carImageName: {
    type: String,
    required: [true, "car photo required"],
  },

  carImageCloudId: {
    type: String,
    required: [true, "car photo required"],
  },

  carImageCloudUrl: {
    type: String,
    required: [true, "car photo required"],
  },
  carQuantity: {
    type: Number,
    required: [true, "Number of cars ordered required"],
  },
  orderStatus: {
    type: String,
    enum: {
      values: [
        ORDER_STATUS.PENDING,
        ORDER_STATUS.APPROVED,
        ORDER_STATUS.REJECTED,
      ],
      message:
        "Invalid {VALUE} role, accepted ones are PENDING, REJECTED, APPROVED",
    },
    default: ORDER_STATUS.PENDING,
  },
});

export const OrderModel = model<IOrder>("Orders", orderSchema);
