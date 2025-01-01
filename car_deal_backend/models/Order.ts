import { model, Schema } from "mongoose";
import { IOrder } from "../types";
import { ORDER_STATUS } from "../constants/orderStatus";

const orderSchema = new Schema<IOrder>({
  name: {
    type: String,
    required: [true, "car name required"],
  },
  photo: {
    type: String,
    required: [true, "car photo required"],
  },
  quantity: {
    type: Number,
    required: [true, "Number of cars ordered required"],
  },
  status: {
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

export const CarModel = model<IOrder>("Contacts", orderSchema);
