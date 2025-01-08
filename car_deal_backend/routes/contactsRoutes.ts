import { Router } from "express";
import { addContact, deleteContact, deleteContacts, getContacts, getSingleContact, updateContact } from "../controllers/contactController";

export const contactRouter = Router()

// @ts-ignore
contactRouter.post('/contact', addContact)


// @ts-ignore
contactRouter.put('/contact/:contactId', updateContact)


// @ts-ignore
contactRouter.get('/contact/:contactId', getSingleContact)


// @ts-ignore
contactRouter.get('/contact', getContacts)


// @ts-ignore
contactRouter.delete('/contact/:contactId', deleteContact)


// @ts-ignore
contactRouter.delete('/contact', deleteContacts)

