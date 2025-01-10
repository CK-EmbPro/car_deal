import { Router } from "express";
import { deleteAllUsers, deleteUser, getSingleUser, getUsers, login, register, verifyCode } from "../controllers/userController";
import { upload } from "../config/multerConfig";
import { getSingleCar } from "../controllers/carController";

export const authRouter = Router()

// @ts-ignore
authRouter.post('/register',upload.single('file'), register)

// @ts-ignore
authRouter.post('/login', login)


// @ts-ignore
authRouter.post('/verify-code', verifyCode)

// @ts-ignore
authRouter.get('/user', getUsers)

// @ts-ignore
authRouter.get('/user/:userId', getSingleUser)


// @ts-ignore
authRouter.delete('/user/:userId', deleteUser)

// @ts-ignore
authRouter.delete('/user', deleteAllUsers)