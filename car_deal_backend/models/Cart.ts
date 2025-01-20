import { model, Schema } from "mongoose";
import { ICart } from "../types";

const cartSchema = new Schema<ICart>({
  carName: { type: String, required: [true, "car name required"] },
  carImageName: { type: String, required: [true, "car imageName required"] },
  carImageCloudId: { type: String, required: [true, "car image cloudId required"] },
  carImageCloudUrl: { type: String, required: [true, "car image cloudUrl required"] },
  unitPrice: { type: Number, required: [true, "car price required"] },
  quantity: { type: Number, required: [true, "Quantity of cars required"] },
  userEmail: {
    type: String,
    required: true,
    unique: false,
    index: false,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  userPhoneNumber: { type: String, required: [true, ""] },
}, {timestamps: true});


// cartSchema.index({ userEmail: 1, carName: 1, carImageCloudId: 1 }, { unique: false });

// // Before creating the model, try to drop any existing unique indexes
// try {
//   if (model('carts')) {
//     model('carts').collection.dropIndexes();
//   }
// } catch (error) {
//   // Model doesn't exist yet, which is fine
// }

export const CartModel = model<ICart>("carts", cartSchema);
