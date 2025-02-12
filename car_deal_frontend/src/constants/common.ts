export const AUTH_TOKEN_NAME = 'auth_token'
export const USER_STORAGE_KEY= 'current_user'
export enum ORDER_STATUS {
    PENDING= "PENDING",
    APPROVED= "APPROVED",
    REJECTED= "REJECTED",
}

// Middleware search params
export const NOT_LOGGED_IN = 'not_logged_in'
export const FORBIDDEN = 'forbidden'
export const JWT_EXPIRED = 'jwt_expired'
export const CERTAIN_ERROR = 'certain_error'