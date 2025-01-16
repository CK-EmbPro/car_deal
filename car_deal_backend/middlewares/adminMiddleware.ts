import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express';
import { BadRequestError, ForbiddenError, NotFoundError, UnauthorizedError } from '../exceptions/errors';
import { verifyToken } from '../utils/jwt';
import { UserModel } from '../models/User';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
import { ADMIN_EMAIL } from '../constants/envVariables';
import { ApiResponse } from '../apiResponse/ApiResponse';

dotenv.config()

const adminEmail = ADMIN_EMAIL

export const adminMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.header("Authorization")?.substring(7);
        if (!token) {
            throw new UnauthorizedError("Auth is required")

        }

        const decodedToken = verifyToken(token);
        //@ts-ignore
        const user = decodedToken?.decodedUser?.user;

        const currentUser = await UserModel.findOne({ email: user.email });

        if (!currentUser) {
            throw new BadRequestError("Invalid token, user not found")
        } else if (currentUser.email != adminEmail) {
            throw new ForbiddenError("Operation not allowed")
        }

        next();
    } catch (error) {
        if (error instanceof BadRequestError) {
            return res.status(400).json(new ApiResponse(error.message, null))
        } else if (error instanceof ForbiddenError) {
            return res.status(403).json(new ApiResponse(error.message, null))
        } else if (error instanceof jwt.TokenExpiredError) {
            return res.status(400).json(new ApiResponse(error.message, null));
        } else if (error instanceof NotFoundError) {
            return res.status(404).json(new ApiResponse(error.message, null));
        } else if (error instanceof UnauthorizedError) {
            return res.status(401).json(new ApiResponse(error.message, null));
        } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(400).json(new ApiResponse(error.message, null));

        } else if (error instanceof mongoose.Error.ValidationError) {
            const validationErrors = Object.values(error.errors).map(
                (err) => err?.message
            );
            return res.status(400).json(new ApiResponse(validationErrors[0], null));
        }

        else if (error instanceof Error) {
            return res.status(400).json(new ApiResponse(error.message, null));
        }
    }
};