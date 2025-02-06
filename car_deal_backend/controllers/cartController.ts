import { Request, Response } from "express";
import { CartModel } from "../models/Cart";
import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../exceptions/errors";
import { ApiResponse } from "../apiResponse/ApiResponse";

export const addCartItem = async (req: Request, res: Response) => {
  try {
    const {
      carName,
      unitPrice,
      quantity,
      carImageName,
      carImageCloudId,
      carImageCloudUrl,
      userEmail,
      userPhoneNumber,
    } = req.body;

    let savedCart = new CartModel({
      carName,
      unitPrice,
      quantity,
      carImageName,
      carImageCloudId,
      carImageCloudUrl,
      userEmail,
      userPhoneNumber,
    });

    savedCart = await savedCart.save();

    return res
      .status(201)
      .json(new ApiResponse("Cart saved successfully", savedCart));
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json(new ApiResponse(validationErrors[0], null));
    } else if (error instanceof Error) {
      return res.status(400).json(new ApiResponse(error.message, null));
    }
  }
};

// export const updateCartItem = async (req: Request, res: Response) => {
//   try {
//     const { cartId } = req.params;
//     const updatedCartItemData = req.body;

//     const updatedCartItem = await CartModel.findByIdAndUpdate(
//       cartId,
//       updatedCartItemData,
//       { new: true }
//     );
//     if (!updatedCartItem) throw new NotFoundError("Cart item not found");

//     return res
//       .status(200)
//       .json(new ApiResponse("Updated cart item successfully", updatedCartItem));
//   } catch (error) {
//     if (error instanceof NotFoundError) {
//       return res.status(404).json(new ApiResponse(error.message, null));
//     } else if (error instanceof mongoose.Error.ValidationError) {
//       const validationErrors = Object.values(error.errors).map(
//         (err) => err.message
//       );
//       return res.status(400).json(new ApiResponse(validationErrors[0], null));
//     } else if (error instanceof Error) {
//       return res.status(400).json(new ApiResponse(error.message, null));
//     }
//   }
// };

export const updateWholeCart = async (req: Request, res: Response) => {
  try {
    const updatedCart = req.body;
    if (!Array.isArray(updatedCart) || updatedCart.length === 0) {
      throw new BadRequestError("No items to update")
    }

    for (const item of updatedCart) {
      if (!item._id) {
        throw new BadRequestError("Item must have id")
      }
    }

    const bulkOperations = updatedCart.map((item) => ({
      updateOne: {
        filter: { _id: item._id },
        update: {
          $set: {
            quantity: item.quantity
          }
        }
      }
    }))

    const result = await CartModel.bulkWrite(bulkOperations)

    if (result.modifiedCount === 0) {
      throw new BadRequestError("No changes made")
    }

    return res.status(200).json(
      new ApiResponse("Successfully updated cart", {
        modifiedCount: result.modifiedCount,
        matchedCount: result.matchedCount
      })
    )

  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json(new ApiResponse(error.message, null));
    } else if (error instanceof BadRequestError) {
      return res.status(400).json(new ApiResponse(error.message, null));
    }
    else if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json(new ApiResponse(validationErrors[0], null));
    } else if (error instanceof Error) {
      return res.status(400).json(new ApiResponse(error.message, null));
    }
  }
};

export const getCartItem = async (req: Request, res: Response) => {
  try {
    const { cartId } = req.params;
    const cartItem = await CartModel.findById(cartId);

    if (!cartItem) throw new NotFoundError("Cart item not found");

    return res
      .status(200)
      .json(new ApiResponse("Cart items retrieved successfully", cartItem));
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json(new ApiResponse(error.message, null));
    } else if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json(new ApiResponse(validationErrors[0], null));
    } else if (error instanceof Error) {
      return res.status(400).json(new ApiResponse(error.message, null));
    }
  }
};

export const getCartItemList = async (req: Request, res: Response) => {
  try {
    const cartItemList = await CartModel.find();
    return res
      .status(200)
      .json(new ApiResponse("Cart items retrieved successfully", cartItemList));
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json(new ApiResponse(validationErrors[0], null));
    }
    if (error instanceof Error) {
      return res.status(400).json(new ApiResponse(error.message, null));
    }
  }
};

export const deleteCartItem = async (req: Request, res: Response) => {
  try {
    const { cartId } = req.params;
    const deletedCartItem = await CartModel.findByIdAndDelete(cartId);
    if (!deletedCartItem) throw new NotFoundError("Cart item not found");

    return res
      .status(200)
      .json(new ApiResponse("Cart item deleted successfully", null));
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json(new ApiResponse(error.message, null));
    } else if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json(new ApiResponse(validationErrors[0], null));
    } else if (error instanceof Error) {
      return res.status(400).json(new ApiResponse(error.message, null));
    }
  }
};

export const deleteAllCartItems = async (req: Request, res: Response) => {
  try {
    const result = await CartModel.deleteMany();
    if (result.deletedCount === 0) {
      throw new BadRequestError("No cart items to delete")
    }
    return res
      .status(200)
      .json(new ApiResponse("Carts deleted successfully", null));
  } catch (error) {
    if (error instanceof BadRequestError) {
      return res.status(400).json(new ApiResponse(error.message, null))

    } else if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json(new ApiResponse(validationErrors[0], null));
    }
    if (error instanceof Error) {
      return res.status(400).json(new ApiResponse(error.message, null));
    }
  }
};
