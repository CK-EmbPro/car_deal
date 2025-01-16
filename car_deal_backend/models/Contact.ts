import { model, Schema } from "mongoose";
import {  IContact } from "../types";

const contactSchema = new Schema<IContact>({
    firstName: {type:String, required:[true, "first name required"]},
    lastName: {type:String, required:[true, "last name required"]},
    email: {type:String, required:true, unique: false, match: [/.+@.+\..+/, "Please enter a valid email address"]},
    message: {type:String, required:[true, "message required"]},
    phoneNumber: {type:String, required:[true, "phone number required"]}
})

export const ContactModel = model<IContact>('Contacts', contactSchema)