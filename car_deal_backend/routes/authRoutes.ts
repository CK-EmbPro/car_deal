import { Router } from "express";
import { login, register, verifyCode } from "../controllers/userController";

export const authRouter = Router()

// @ts-ignore
authRouter.post('/register', register)

// @ts-ignore
authRouter.post('/login', login)


// @ts-ignore
authRouter.post('/verify-code', verifyCode)

