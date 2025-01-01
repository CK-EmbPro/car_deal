import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "../types";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../exceptions/errors";
dotenv.config();

const jwtSecretKey = process.env.JWT_SECRET;

export const generateToken = (user: IUser) => {
  if (!jwtSecretKey) {
    throw new NotFoundError("Jwt secret key to sign token, not found");
  }

  if (!user) {
    throw new BadRequestError("No user specified for token generation");
  }

  try {
    const token = jwt.sign({ user }, jwtSecretKey, { expiresIn: 60 * 60 });

    return token;
  } catch (error) {
    throw error;
  }
};

export const verifyToken = (token: string) => {
  try {
    if (!jwtSecretKey) {
      throw new NotFoundError("Jwt secret key not provided");
    } else if (!token) {
      throw new UnauthorizedError("Auth Token required");
    }

    const decodedUser = jwt.verify(token, jwtSecretKey) as JwtPayload;
    return {
      decodedUser,
    };
  } catch (error) {
    throw error;
  }
};
