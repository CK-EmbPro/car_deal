import { Request, Response } from "express";
import { UserModel } from "../models/User";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../exceptions/errors";
import crypto from "crypto";
import { emailSender } from "../utils/emailSender";
import mongoose from "mongoose";
import { generateToken } from "../utils/jwt";
import { IUser, MulterRequest } from "../types";
import fs from "fs";
import { uploadImage } from "../utils/uploadCloudinaryImage";
import { EMAIL_CONTEXT } from "../constants/emailContext";

// Temporary storage for verification codes
let verificationCodes = new Map<string, { code: string; expiresAt: Date }>();

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userToLogin = await UserModel.findOne({ email });

    if (!userToLogin) {
      throw new NotFoundError("User not found");
    } else if (!(await userToLogin.comparePassword(password))) {
      throw new BadRequestError("Invalid password");
    }

    // Generate verification code
    const verificationCode = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); //5 minutes expiry

    // Temporary store verificationCode
    verificationCodes.set(email, {
      code: verificationCode,
      expiresAt: expiresAt,
    });

    // Send verificationCode to email
    emailSender({
      emailContext: EMAIL_CONTEXT.VERIFICATION_CODE, 
      signInEmail: email,
      verificationCode

    });
  } catch (error) {
    if (error instanceof BadRequestError) {
      return res.status(400).json(new ApiResponse(error.message, null));
    } else if (error instanceof NotFoundError) {
      return res.status(404).json(new ApiResponse(error.message, null));
    } else if (error instanceof Error) {
      return res.status(500).json(new ApiResponse(error.message, null));
    } else if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err?.message
      );

      return res.status(400).json(new ApiResponse(validationErrors[0], null));
    }
  }
};

export const verifyCode = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;
    const record = verificationCodes.get(email);

    if (!record || record.code !== code) {
      throw new UnauthorizedError("Invalid code");
    }

    if (record.expiresAt < new Date()) {
      verificationCodes.delete(email);
      throw new UnauthorizedError("code expired");
    }

    verificationCodes.delete(email);

    // Get the user
    const userToLogin = await UserModel.findOne({ email });
    if (!userToLogin) throw new NotFoundError("User not found");

    // Generate jwt token
    const token = generateToken(userToLogin);

    // Api Response
    return res
      .status(200)
      .json(new ApiResponse<IUser>("Welcome back", userToLogin, token));
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json(new ApiResponse(error.message, null));
    } else if (error instanceof UnauthorizedError) {
      return res.status(401).json(new ApiResponse(error.message, null));
    } else if (error instanceof Error) {
      return res.status(400).json(new ApiResponse(error.message, null));
    } else if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err?.message
      );
      return res.status(400).json(new ApiResponse(validationErrors[0], null));
    }
  }
};

export const register = async (req: MulterRequest, res: Response) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;
    const filePath = req.file?.path;

    // Check if profile photo is provided
    if (!filePath || !fs.existsSync(filePath)) {
      throw new NotFoundError("No file uploaded");
    }

    const userExists = await UserModel.findOne({ email });
    // Check if user claims to be admin
    if (userExists?.email === "kennydebrice2@gmail.com") {
      return res
        .status(409)
        .json(new ApiResponse<IUser>("Admin already exists", userExists));
    }

    // Check if user exists already
    if (userExists) {
      return res
        .status(409)
        .json(new ApiResponse<IUser>("User already exists", userExists));
    }

    // Upload to cloudinary profilephoto
    const { fileNameWithExtension, imagePublicId, imageUrl } =
      await uploadImage(filePath);

    const userToSave = new UserModel({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      profilePhotoName: fileNameWithExtension,
      profilePhotoPublicId: imagePublicId,
      profilePhotoUrl: imageUrl,
    });

    const savedUser = await userToSave.save();
    const token = generateToken(savedUser);

    return res
      .status(201)
      .json(
        new ApiResponse<IUser>(
          "You've registered successfully",
          savedUser,
          token
        )
      );
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json(new ApiResponse(error.message, null));
    } else if (error instanceof Error) {
      return res.status(500).json(new ApiResponse(error.message, null));
    } else if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err?.message
      );
      return res.status(400).json(new ApiResponse(error.message, null));
    }
  }
};

