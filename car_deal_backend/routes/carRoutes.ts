import { Router } from "express";
import { authRouter } from "./authRoutes";
import { addCar, deleteAllCars, deleteCar, getAllCars, getSingleCar, updateCar } from "../controllers/carController";
import { upload } from "../config/multerConfig";

export const carRouter = Router()

// @ts-ignore
carRouter.post('/car',upload.single('file'), addCar)


// @ts-ignore
carRouter.put('/car/:carId', upload.single('file'), updateCar)


// @ts-ignore
carRouter.get('/car/:carId', getSingleCar)


// @ts-ignore
carRouter.get('/car', getAllCars)


// @ts-ignore
carRouter.delete('/car/:carId', deleteCar)


// @ts-ignore
carRouter.delete('/car', deleteAllCars)

