import { Router } from "express";
import { deleteOrder, deleteOrders, getOrders, getSingleOrder, placeOrder, updatedOrder } from "../controllers/orderController";

export const orderRouter = Router()

// @ts-ignore
orderRouter.post('/order', placeOrder)

// @ts-ignore
orderRouter.put('/order/:orderId', updatedOrder)

// @ts-ignore
orderRouter.get('/order/:orderId', getSingleOrder)


// @ts-ignore
orderRouter.get('/order', getOrders)

// @ts-ignore
orderRouter.delete('/order/:orderId', deleteOrder)

// @ts-ignore
orderRouter.delete('/order', deleteOrders)

