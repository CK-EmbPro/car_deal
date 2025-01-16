import { Router } from "express";
import { authRouter } from "./authRoutes";
import { addCar, deleteAllCars, deleteCar, getAllCars, getSingleCar, updateCar, updatedCarIsLiked } from "../controllers/carController";
import { upload } from "../config/multerConfig";
import { adminMiddleware } from "../middlewares/adminMiddleware";

export const carRouter = Router()

// // @ts-ignore
// carRouter.post('/car',adminMiddleware, upload.single('file'), addCar)


// // @ts-ignore
// carRouter.put('/car/:carId',adminMiddleware, upload.single('file'), updateCar)


// // @ts-ignore
// carRouter.get('/car/:carId', getSingleCar)


// // @ts-ignore
// carRouter.get('/car', getAllCars)


// // @ts-ignore
// carRouter.delete('/car/:carId',adminMiddleware, deleteCar)


// // @ts-ignore
// carRouter.delete('/car',adminMiddleware, deleteAllCars)


// @ts-ignore
carRouter.post('/car', upload.single('file'), addCar)


// @ts-ignore
carRouter.put('/car/:carId', upload.single('file'), updateCar)

// @ts-ignore
carRouter.put('/car/:carId/like', updatedCarIsLiked)

// @ts-ignore
carRouter.get('/car/:carId', getSingleCar)


// @ts-ignore
carRouter.get('/car', getAllCars)


// @ts-ignore
carRouter.delete('/car/:carId', deleteCar)


// @ts-ignore
carRouter.delete('/car', deleteAllCars)

