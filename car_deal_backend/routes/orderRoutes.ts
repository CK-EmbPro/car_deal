import { Router } from "express";
import { createCheckoutSession, deleteOrder, deleteOrders, getOrders, getSingleOrder, makePaymentAndOrder, updatedOrder } from "../controllers/orderController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";

export const orderRouter = Router()

// // @ts-ignore
// orderRouter.post('/order/create-checkout-session',authMiddleware, createCheckoutSession)


// // @ts-ignore
// orderRouter.post('/order',authMiddleware, makePaymentAndOrder)

// // @ts-ignore
// orderRouter.put('/order/:orderId',adminMiddleware, updatedOrder)

// // @ts-ignore
// orderRouter.get('/order/:orderId',adminMiddleware, getSingleOrder)


// // @ts-ignore
// orderRouter.get('/order',adminMiddleware, getOrders)

// // @ts-ignore
// orderRouter.delete('/order/:orderId',adminMiddleware, deleteOrder)

// // @ts-ignore
// orderRouter.delete('/order',adminMiddleware, deleteOrders)



// @ts-ignore
orderRouter.post('/order/create-checkout-session', createCheckoutSession)


// @ts-ignore
orderRouter.post('/order', makePaymentAndOrder)

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

