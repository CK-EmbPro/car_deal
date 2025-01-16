import { VERIFICATION_CODE_STATUS } from "../constants/verifyCodeStatus";

export interface IVerificationCode {
    email: string;
    code: number;
    codeStatus: (typeof VERIFICATION_CODE_STATUS)[keyof typeof VERIFICATION_CODE_STATUS];
    expiresAt: Date
}