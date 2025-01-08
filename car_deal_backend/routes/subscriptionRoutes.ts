import { Router } from "express";
import { addSubscription, deleteSingleSubscription, deleteSubscriptions, getSingleSubscription, getSubscriptions, updateSubscription } from "../controllers/subscriptionController";

export const subscriptionRouter = Router()

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
