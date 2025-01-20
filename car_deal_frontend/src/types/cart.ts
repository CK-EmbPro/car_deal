import { StaticImageData } from "next/image";

export interface ICartItem {
    carName: string;
    unitPrice: number;
    quantity: number;
    carImageName: string;
    carImageCloudId: string;
    carImageCloudUrl: string;
    userEmail: string;
    userPhoneNumber: string;
}

export interface ISavedCartItem extends ICartItem {
    _id: string;
    createdAt: string;
    updatedAt: string;
}
