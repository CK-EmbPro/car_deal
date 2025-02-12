import { Router } from "express";
import { deleteAllUsers, deleteUser, getSingleUser, getUsers, login, getProfile, register, resendEmailVerification, verifyCode, logout } from "../controllers/userController";
import { upload } from "../config/multerConfig";
import { adminMiddleware } from "../middlewares/adminMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";

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
authRouter.get('/me',authMiddleware, getProfile)

// @ts-ignore
authRouter.delete('/logout', authMiddleware, logout)

// @ts-ignore
authRouter.get('/user',authMiddleware, getUsers)

// @ts-ignore
authRouter.get('/user/:userId',authMiddleware, getSingleUser)


// @ts-ignore
authRouter.delete('/user/:userId',authMiddleware, deleteUser)

// @ts-ignore
authRouter.delete('/user',authMiddleware, deleteAllUsers)