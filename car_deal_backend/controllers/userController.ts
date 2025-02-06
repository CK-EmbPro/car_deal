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
import { ApiResponse } from "../apiResponse/ApiResponse";
import { deleteCloudinaryImage } from "../utils/deleteCloudinaryImage";
import { CLOUD_FOLDERS } from "../constants/cloudFolderNames";
import { ADMIN_EMAIL } from "../constants/envVariables";
import { VerificationCodeModel } from "../models/VerificationCode";
import { VERIFICATION_CODE_STATUS } from "../constants/verifyCodeStatus";



export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userToLogin = await UserModel.findOne({ email });

    // generate verfication code
    const verificationCode = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 1 * 60 * 1000); //30 seconds expiry


    if (!userToLogin) {
      throw new NotFoundError("User not found");
    } else if (!(await userToLogin.comparePassword(password))) {
      throw new BadRequestError("Invalid password");
    }
    // Delete all verification codes related to the email 
    await VerificationCodeModel.deleteMany({ email })

    // Generate verificationCode 
    const codeToVerify = new VerificationCodeModel({
      email,
      code: verificationCode,
      expiresAt,
      codeStatus: VERIFICATION_CODE_STATUS.AVAILABLE
    })

    // Store the verification code
    await codeToVerify.save()

    // Send verificationCode to email
    emailSender({
      emailContext: EMAIL_CONTEXT.VERIFICATION_CODE,
      signInEmail: email,
      verificationCode,
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          "Please check your email for verification code",
          userToLogin
        )
      );
  } catch (error) {
    if (error instanceof BadRequestError) {
      return res.status(400).json(new ApiResponse(error.message, null));
    } else if (error instanceof NotFoundError) {
      return res.status(404).json(new ApiResponse(error.message, null));
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

export const verifyCode = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;

    // Check if email and code is provided
    if (!email) {
      throw new BadRequestError("No email provided")
    } else if (!code) {
      throw new BadRequestError("No code to verify")
    }

    //Check if the email exists
    if (!(await UserModel.findOne({ email })))
      throw new NotFoundError("Email provided not found");

    const record = await VerificationCodeModel.findOne({ email });

    // Check if the code is reused
    if (!record) {
      throw new UnauthorizedError("Code already used ");
    }
    // Check if code is not altered
    if (record.code !== code) {
      throw new UnauthorizedError("Invalid code");
    }

    // Check if the expiry date of code has reached
    if (record.expiresAt < new Date()) {
      await VerificationCodeModel.findOneAndUpdate({ email }, { $set: { codeStatus: VERIFICATION_CODE_STATUS.USED } }, { new: true })
      throw new UnauthorizedError("code expired");
    }

    await VerificationCodeModel.findOneAndDelete({ email });

    // Get the user
    const userToLogin = await UserModel.findOne({ email });
    if (!userToLogin) throw new NotFoundError("User not found");

    // Generate jwt token
    const token = generateToken(userToLogin);

    // Api Response
    return res
      .status(200)
      .json(new ApiResponse<IUser>("Welcome back ", userToLogin, token));
  } catch (error) {
    if (error instanceof NotFoundError) {
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

export const resendEmailVerification = async (req: Request, res: Response) => {
  try {
    const { email } = req.body

    // generate verfication code
    const verificationCode = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 1 * 60 * 1000); //30 seconds expiry

    // Delete all codes related to that email
    await VerificationCodeModel.deleteMany({ email })

    // Create a new verification code
    const codeToVerify = new VerificationCodeModel({
      code: verificationCode,
      codeStatus: VERIFICATION_CODE_STATUS.AVAILABLE,
      email,
      expiresAt
    })

    await codeToVerify.save()

    // Send the code to the email
    emailSender({
      emailContext: EMAIL_CONTEXT.VERIFICATION_CODE,
      signInEmail: email,
      verificationCode,
    });

    return res.status(201).json(new ApiResponse("Please check your email for verification code", null))

  } catch (error) {

  }
}


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
    if (userExists?.email === ADMIN_EMAIL!) {
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
      await uploadImage(CLOUD_FOLDERS.USERS_PROFILE_PHOTOS, filePath);

    const userToSave = new UserModel({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      profilePhotoName: fileNameWithExtension,
      profilePhotoCloudUrl: imageUrl,
      profilePhotoCloudId: imagePublicId,
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
    } else if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err?.message
      );
      return res.status(400).json(new ApiResponse(error.message, null));
    } else if (error instanceof Error) {
      return res.status(400).json(new ApiResponse(error.message, null));
    }
  }
};

export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findById(userId);
    return res
      .status(200)
      .json(new ApiResponse("User retrieved successfully", user));
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err?.message
      );
      return res.status(400).json(new ApiResponse(error.message, null));
    } else if (error instanceof Error) {
      return res.status(400).json(new ApiResponse(error.message, null));
    }
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    return res
      .status(200)
      .json(new ApiResponse("Users retrieved successfully", users));
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err?.message
      );
      return res.status(400).json(new ApiResponse(error.message, null));
    } else if (error instanceof Error) {
      return res.status(400).json(new ApiResponse(error.message, null));
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Delete the user
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    // Check if user is deleted
    if (!deletedUser) throw new NotFoundError("User not found");

    // Delete user profile photo at cloudinary
    await deleteCloudinaryImage(deletedUser.profilePhotoCloudId);

    return res
      .status(200)
      .json(new ApiResponse("User deleted successfully", null));
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json(new ApiResponse(error.message, null));
    } else if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json(new ApiResponse(validationErrors[0], null));
    } else if (error instanceof Error) {
      return res.status(400).json(new ApiResponse(error.message, null));
    }
  }
};

export const deleteAllUsers = async (req: Request, res: Response) => {
  try {
    // Retrieve imageCloudIds of all users
    const usersToDelete = await UserModel.find({}, "imageCloudId");

    // Check if userImgCloudIds is empty
    if (usersToDelete.length === 0)
      throw new NotFoundError("No users to delete");

    //delete all users Imgs at cloudinaryy
    await Promise.all(
      usersToDelete.map((user) =>
        deleteCloudinaryImage(user.profilePhotoCloudId)
      )
    );

    // Now delete all users
    await UserModel.deleteMany();

    return res
      .status(200)
      .json(new ApiResponse("Users deleted successfully", null));
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json(new ApiResponse(error.message, null));
    } else if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json(new ApiResponse(validationErrors[0], null));
    } else if (error instanceof Error) {
      return res.status(400).json(new ApiResponse(error.message, null));
    }
  }
};
