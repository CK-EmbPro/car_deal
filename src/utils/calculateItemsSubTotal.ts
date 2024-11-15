import { CartItem } from "@/types/cart"

export const calculateItemsSubtotal = (cartItems: CartItem[]) => {
    return cartItems.reduce((total, item) => total + (item.price * item.itemQuantity), 0)
}