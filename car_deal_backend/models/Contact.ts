import { model, Schema } from "mongoose";
import { ICart, IContact } from "../types";

const contactSchema = new Schema<IContact>({
    firstName: {type:String, required:[true, "first name required"]},
    lastName: {type:String, required:[true, "last name required"]},
    email: {type:String, required:true, unique: true, match: [/.+@.+\..+/, "Please enter a valid email address"]},
    message: {type:String, required:[true, "first name required"]},
    phoneNumber: {type:String, required:[true, "first name required"]}
})

export const CarModel = model<IContact>('Contacts', contactSchema)