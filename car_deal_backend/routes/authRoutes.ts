import { Router } from "express";
import { deleteAllUsers, login, register, verifyCode } from "../controllers/userController";
import { upload } from "../config/multerConfig";

export const authRouter = Router()

// @ts-ignore
authRouter.post('/register',upload.single('file'), register)

// @ts-ignore
authRouter.post('/login', login)


// @ts-ignore
authRouter.post('/verify-code', verifyCode)


// @ts-ignore
authRouter.delete('/delete-users', deleteAllUsers)