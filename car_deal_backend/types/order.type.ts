import { ORDER_STATUS } from "../constants/orderStatus";

export interface IOrder {
    name: string;
    totalPrice: number;
    photo: string;
    quantity: number;
    status: (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS]
    userEmail: string;
    userPhoneNumber: string
}