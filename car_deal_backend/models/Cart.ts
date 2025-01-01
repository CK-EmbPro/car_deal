import { model, Schema } from "mongoose";
import { ICart } from "../types";

const cartSchema = new Schema<ICart>({
    name: {type: String, required: [true, "car name required"]},
    photo: {type: String, required: [true, "car photo required"]},
    price: {type: Number, required: [true, "car price required"]},
    userEmail: {type: String, required: true, unique: true, match: [/.+@.+\..+/, "Please enter a valid email address"]},
    userPhoneNumber: {type: String, required: [true, ""]}
})

export const CarModel = model<ICart>('Carts', cartSchema)