import { Router } from "express";
import { addCar, updateCar } from "../controllers/carController";
import { addCartItem, deleteAllCartItems, deleteCartItem, getCartItem, getCartItemList, updateWholeCart } from "../controllers/cartController";

export const cartRouter = Router()

// @ts-ignore
cartRouter.post('/cart', addCartItem)

// @ts-ignore
cartRouter.put('/cart', updateWholeCart)

// @ts-ignore
cartRouter.get('/cart/:cartId', getCartItem)

// @ts-ignore
cartRouter.get('/cart', getCartItemList)

// @ts-ignore
cartRouter.delete('/cart/:cartId', deleteCartItem)

// @ts-ignore
cartRouter.delete('/cart', deleteAllCartItems)