import { StaticImageData } from "next/image";

export interface CartItem {
    image: StaticImageData,
    cartItemName: string,
    price: number,
    itemQuantity: number,
}
