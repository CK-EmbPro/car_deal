import { ORDER_STATUS } from "@/constants/common";
import { StaticImageData } from "next/image";

export interface IOrderItem {
    _id: string
    carName: string;
    totalPrice: number;
    carImageName: string;
    carImageCloudId: string;
    carImageCloudUrl: string;
    carQuantity: number;
    orderStatus: ORDER_STATUS;
    userEmail: string;
    userPhoneNumber: string;
}

export interface ISavedOrderItem extends IOrderItem {
    createdAt: string;
    updatedAt: string;
}
