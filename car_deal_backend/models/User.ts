import { model, Schema } from "mongoose";
import { IUser } from "../types";
import bcrypt from 'bcryptjs'

interface IUserDocument extends Document, IUser{
  comparePassword(password: string): Promise<boolean>
}

const userSchema = new Schema<IUserDocument>({
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

  profilePhotoName: {
    type: String,
    required: [true, "Profile photo is required"],
  },

  profilePhotoCloudId: {
    type: String,
    required: [true, "Profile photo cloud_id is required"],
  },

  profilePhotoCloudUrl: {
    type: String,
    required: [true, "Profile photo url is required"],
  },
});

userSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function(password: string){
  return await bcrypt.compare(password, this.password)
}

export const UserModel = model<IUserDocument>("Users", userSchema);
