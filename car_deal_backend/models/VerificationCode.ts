import { model, Schema } from "mongoose";
import { IVerificationCode } from "../types/verificationCode.type";
import { VERIFICATION_CODE_STATUS } from "../constants/verifyCodeStatus";


const verificationCodeSchema = new Schema<IVerificationCode>({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },

  code: {
    type: Number,
    required: [true, "Code is required"],
  },

  codeStatus: {
    type: String,
    enum: {
      values: [
        VERIFICATION_CODE_STATUS.AVAILABLE,
        VERIFICATION_CODE_STATUS.USED
      ],
      message: "Invalid {VALUE} role, accepted ones are USED and AVAILABLE only"
    },

    default: VERIFICATION_CODE_STATUS.AVAILABLE,
  },

  expiresAt: {
    type: Date,
    required: [true, "expiry date is required"]
  }
  
  
});


export const VerificationCodeModel = model<IVerificationCode>("verificationCodes", verificationCodeSchema);
