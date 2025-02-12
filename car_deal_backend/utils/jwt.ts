import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "../types";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../exceptions/errors";
import { JWT_SECRET, TOKEN_EXPIREATION_TIME } from "../constants/envVariables";
dotenv.config();


export const generateToken = (user: IUser) => {
  if (!JWT_SECRET) {
    throw new NotFoundError("Jwt secret key to sign token, not found");
  }

  if (!user) {
    throw new BadRequestError("No user specified for token generation");
  }

  try {
    const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: TOKEN_EXPIREATION_TIME });

    return token;
  } catch (error) {
    throw error;
  }
};

export const verifyToken = (token: string) => {
  try {
    if (!JWT_SECRET) {
      throw new NotFoundError("Jwt secret key not provided");
    } else if (!token) {
      throw new UnauthorizedError("Auth Token required");
    }

    const decodedUser = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return {
      decodedUser,
    };
  } catch (error) {
    throw error;
  }
};
