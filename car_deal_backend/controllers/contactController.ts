import { Request, Response } from "express";
import { ContactModel } from "../models/Contact";
import { NotFoundError } from "../exceptions/errors";
import mongoose from "mongoose";
import { emailSender } from "../utils/emailSender";
import { EMAIL_CONTEXT } from "../constants/emailContext";

export const addContact = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phoneNumber, message } = req.body;
    let savedContact = new ContactModel({
      firstName,
      lastName,
      email,
      phoneNumber,
      message,
    });

    savedContact = await savedContact.save();

    const contacterNames = `${firstName} ${lastName}`;

    emailSender({
        emailContext: EMAIL_CONTEXT.CONTACT,
        contacterEmail: email,
        contacterNames
    })
    
    return res
      .status(201)
      .json(new ApiResponse("Contacted successfully", savedContact));
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(new ApiResponse(error.message, null));
    } else if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json(new ApiResponse(validationErrors[0], null));
    }
  }
};

export const updateContact = async (req: Request, res: Response) => {
  try {
    const { contactId } = req.params;
    const updatedContactData = req.body;
    const updatedContact = await ContactModel.findByIdAndUpdate(
      contactId,
      updatedContactData,
      { new: true }
    );

    if (!updatedContact) {
      throw new NotFoundError("Contact not found");
    }

    return res
      .status(200)
      .json(new ApiResponse("Contact updated successfully", updatedContact));
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json(new ApiResponse(error.message, null));
    } else if (error instanceof Error) {
      return res.status(400).json(new ApiResponse(error.message, null));
    } else if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json(new ApiResponse(validationErrors[0], null));
    }
  }
};

export const getSingleContact = async (req: Request, res: Response) => {
  try {
    const { contactId } = req.params;
    const contact = await ContactModel.findById(contactId);
    if (!contact) throw new NotFoundError("Contact not found");

    return res
      .status(200)
      .json(new ApiResponse("Contact retrieved successfully", contact));
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json(new ApiResponse(error.message, null));
    } else if (error instanceof Error) {
      return res.status(400).json(new ApiResponse(error.message, null));
    } else if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json(new ApiResponse(validationErrors[0], null));
    }
  }
};

export const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await ContactModel.find();
    return res
      .status(200)
      .json(new ApiResponse("Contacts retrieved successfully", contacts));
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json(new ApiResponse(error.message, null));
    } else if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json(new ApiResponse(validationErrors[0], null));
    }
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await ContactModel.findByIdAndDelete(contactId);

    if (!deleteContact) throw new Error("Contact not found");

    return res
      .status(200)
      .json(new ApiResponse("Contact deleted successfully", null));
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json(new ApiResponse(error.message, null));
    } else if (error instanceof Error) {
      return res.status(400).json(new ApiResponse(error.message, null));
    } else if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json(new ApiResponse(validationErrors[0], null));
    }
  }
};

export const deleteContacts = async (req: Request, res: Response) => {
  try {
    await ContactModel.deleteMany();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json(new ApiResponse(error.message, null));
    } else if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json(new ApiResponse(validationErrors[0], null));
    }
  }
};
