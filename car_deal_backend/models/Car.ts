import { model, Schema } from "mongoose";
import { ICar } from "../types/car.type";

const carSchema = new Schema<ICar>({
    name: {type: String, required: [true, "car name required"]},
    price: {type: Number, required: [true, "car price required"]},
    category: {type: String, required: [true, "car category required"]},
    description: {type:String, required: [true, "car description required"]},
    isLiked: {type: Boolean, required: [true, "specify whether the car is liked"], default: false},
    carImageName: {type: String, required: [true, "Image name required"]},
    carImageCloudId: {type: String, required: [true, "Image cloud id required"]},
    carImageCloudUrl: {type: String, required: [true, "Image url required"]},
}, {timestamps: true})

export const CarModel = model<ICar>('Cars', carSchema)