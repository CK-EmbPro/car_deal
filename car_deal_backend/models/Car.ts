import { model, Schema } from "mongoose";
import { ICar } from "../types/car.type";
import { CAR_CATEGORIES } from "../constants/carCategories";

const carSchema = new Schema<ICar>({
    name: {type: String, required: [true, "car name required"]},
    price: {type: Number, required: [true, "car price required"]},
    category: {type: String,
        enum: {
          values: [
            CAR_CATEGORIES.TOYOTA,
            CAR_CATEGORIES.HONDA,
            CAR_CATEGORIES.BMW,
            CAR_CATEGORIES.MERCEDES,
            CAR_CATEGORIES.FORD,
            CAR_CATEGORIES.AUDI,
            CAR_CATEGORIES.TESLA,
            CAR_CATEGORIES.BOUGATTI,
            CAR_CATEGORIES.LAMBORGHINI,
            CAR_CATEGORIES.FERRARI,
          ],
          message:
            "Invalid category {VALUE}",
        }},
    description: {type:String, required: [true, "car description required"]},
    isLiked: {type: Boolean, required: [true, "specify whether the car is liked"], default: false},
    carImageName: {type: String, required: [true, "Image name required"]},
    carImageCloudId: {type: String, required: [true, "Image cloud id required"]},
    carImageCloudUrl: {type: String, required: [true, "Image url required"]},
}, {timestamps: true})

export const CarModel = model<ICar>('Cars', carSchema)