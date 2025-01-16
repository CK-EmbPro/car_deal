import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { verifyToken } from "../utils/jwt";
import { UserModel } from "../models/User";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../exceptions/errors";
import mongoose from "mongoose";
import { ApiResponse } from "../apiResponse/ApiResponse";

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.header("Authorization")?.substring(7);

        if (!token) {
            return res.status(401).json({
                message: "Auth Token required",
            });
        }

        // Decode the token
        const decodedToken = verifyToken(token);
        const user = decodedToken?.decodedUser?.user;

        // Get the user info
        const currentUser = await UserModel.findOne({ ...user });

        // Check if is user is valid
        if (!currentUser) {
            throw new BadRequestError("Invalid token, user not found")
        }

        // If user is valid continue with request
        next();


    } catch (error) {
        if (error instanceof BadRequestError) {
            return res.status(400).json(new ApiResponse(error.message, null))
        } else if (error instanceof jwt.TokenExpiredError) {
            return res.status(400).json(new ApiResponse(error.message, null));
        } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(400).json(new ApiResponse(error.message, null));
        } else if (error instanceof NotFoundError) {
            return res.status(404).json(new ApiResponse(error.message, null));
        } else if (error instanceof UnauthorizedError) {
            return res.status(401).json(new ApiResponse(error.message, null));
        } else if (error instanceof mongoose.Error.ValidationError) {
            const validationErrors = Object.values(error.errors).map(
                (err) => err?.message
            );
            return res.status(400).json(new ApiResponse(validationErrors[0], null));
        } else if (error instanceof Error) {
            return res.status(400).json(new ApiResponse(error.message, null));
        }
    }
};