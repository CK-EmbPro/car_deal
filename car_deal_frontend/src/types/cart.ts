import { StaticImageData } from "next/image";

export interface RawCartItemList {
    entity: ISavedCartItem[];
    message: string;
  }

export interface ICartItem {
    _id: string
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
    createdAt: string;
    updatedAt: string;
}
