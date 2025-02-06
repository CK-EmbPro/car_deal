import { ISavedCartItem } from "@/types/cart"

export const calculateItemsSubtotal = (cartItems:ISavedCartItem[]) => {
    if(cartItems.length === 0) return 0
    return cartItems.reduce((total, item) => total + (item.unitPrice * item.quantity), 0)
}