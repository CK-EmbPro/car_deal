import { Router } from "express";
import { deleteAllUsers, deleteUser, getSingleUser, getUsers, login, register, resendEmailVerification, verifyCode } from "../controllers/userController";
import { upload } from "../config/multerConfig";
import { adminMiddleware } from "../middlewares/adminMiddleware";

export const authRouter = Router()

// // @ts-ignore
// authRouter.post('/register',upload.single('file'), register)

// // @ts-ignore
// authRouter.post('/login', login)


// // @ts-ignore
// authRouter.post('/verify-code', verifyCode)

// // @ts-ignore
// authRouter.post('/resend-email', resendEmailVerification)

// // @ts-ignore
// authRouter.get('/user',adminMiddleware, getUsers)

// // @ts-ignore
// authRouter.get('/user/:userId',adminMiddleware, getSingleUser)


// // @ts-ignore
// authRouter.delete('/user/:userId',adminMiddleware, deleteUser)

// // @ts-ignore
// authRouter.delete('/user',adminMiddleware, deleteAllUsers)


// @ts-ignore
authRouter.post('/register',upload.single('file'), register)

// @ts-ignore
authRouter.post('/login', login)


// @ts-ignore
authRouter.post('/verify-code', verifyCode)

// @ts-ignore
authRouter.post('/resend-email', resendEmailVerification)

// @ts-ignore
authRouter.get('/user', getUsers)

// @ts-ignore
authRouter.get('/user/:userId', getSingleUser)


// @ts-ignore
authRouter.delete('/user/:userId', deleteUser)

// @ts-ignore
authRouter.delete('/user', deleteAllUsers)