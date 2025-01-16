import { Router } from "express";
import { addSubscription, deleteSingleSubscription, deleteSubscriptions, getSingleSubscription, getSubscriptions, updateSubscription } from "../controllers/subscriptionController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";

export const subscriptionRouter = Router()

// // @ts-ignore
// subscriptionRouter.post('/subscribe',authMiddleware, addSubscription)

// // @ts-ignore
// subscriptionRouter.put('/subscribe/:subscriptionId',adminMiddleware, updateSubscription)

// // @ts-ignore
// subscriptionRouter.get('/subscribe/:subscriptionId',adminMiddleware, getSingleSubscription)

// // @ts-ignore
// subscriptionRouter.get('/subscribe',adminMiddleware, getSubscriptions)

// // @ts-ignore
// subscriptionRouter.delete('/subscribe/:subscriptionId',adminMiddleware, deleteSingleSubscription)

// // @ts-ignore
// subscriptionRouter.delete('/subscribe',adminMiddleware, deleteSubscriptions)



// @ts-ignore
subscriptionRouter.post('/subscribe', addSubscription)

// @ts-ignore
subscriptionRouter.put('/subscribe/:subscriptionId', updateSubscription)

// @ts-ignore
subscriptionRouter.get('/subscribe/:subscriptionId', getSingleSubscription)

// @ts-ignore
subscriptionRouter.get('/subscribe', getSubscriptions)

// @ts-ignore
subscriptionRouter.delete('/subscribe/:subscriptionId', deleteSingleSubscription)

// @ts-ignore
subscriptionRouter.delete('/subscribe', deleteSubscriptions)
