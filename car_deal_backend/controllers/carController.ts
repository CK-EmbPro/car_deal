import { Request, Response } from "express";
import { ICar, MulterRequest } from "../types";
import fs from "fs";
import { NotFoundError } from "../exceptions/errors";
import { uploadImage } from "../utils/uploadCloudinaryImage";
import { CarModel } from "../models/Car";
import mongoose from "mongoose";
import { deleteCloudinaryImage } from "../utils/deleteCloudinaryImage";

const addCar = async (req: MulterRequest, res: Response) => {
  try {
    const { name, price, category, description, isLiked } = req.body;
    const filePath = req.file?.path;
    // Check if file is provided
    if (!filePath || fs.existsSync(filePath))
      throw new NotFoundError("No File Uploaded");

    //Upload the file to cloudinary
    const { fileNameWithExtension, imagePublicId, imageUrl } =
      await uploadImage(filePath);

    let savedCar = new CarModel({
      name,
      price,
      category,
      description,
      isLiked,
      image: fileNameWithExtension,
      imageCloudId: imagePublicId,
      imageCloudUrl: imageUrl,
    });

    savedCar = await savedCar.save();

    return res
      .status(201)
      .json(new ApiResponse<ICar>("Registered car successfully", savedCar));
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

const updateCar = async (req: MulterRequest, res: Response) => {
  try {
    let updatedCarData = req.body;
    const { carId } = req.params;
    const filePath = req.file?.path;

    // Check if the car exists
    if (!(await CarModel.findById(carId)))
      throw new NotFoundError("Car not found");

    // If new file is provided update
    let fileName;
    let imageCloudUrl;
    let imageCloudId;
    if (filePath) {
      let fileUploadResult = await uploadImage(filePath);
      fileName = fileUploadResult.fileNameWithExtension;
      imageCloudId = fileUploadResult.imagePublicId;
      imageCloudUrl = fileUploadResult.imageUrl;
    }

    // Add car_image info to updating data
    updatedCarData = {
      ...updatedCarData,
      image: fileName,
      imageCloudId,
      imageCloudUrl,
    };

    // Update the car data
    const updatedCar = await CarModel.findByIdAndUpdate(carId, updatedCarData, {
      new: true,
    });

    return res
      .status(200)
      .json(new ApiResponse("Car updated successfully", updatedCar));
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

const getSingleCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const car = await CarModel.findById(carId);
    if (!car) throw new NotFoundError("Car not found");
    return res
      .status(200)
      .json(new ApiResponse("Car retrieved successfully", car));
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json(new ApiResponse(error.message, null));
    } else if (error instanceof Error) {
      return res.status(400).json(new ApiResponse(error.message, null));
    } else if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(404).json(new ApiResponse(validationErrors[0], null));
    }
  }
};

const getAllCars = async (req: Request, res: Response) => {
  try {
    const cars = await CarModel.find();
    return res
      .status(200)
      .json(new ApiResponse("Cars retrieved successfully", cars));
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json(new ApiResponse(error.message, null));
    }
    if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json(new ApiResponse(validationErrors[0], null));
    }
  }
};

const deleteCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    // Delete car and return deleted car document
    const deletedCar = await CarModel.findByIdAndDelete(carId);

    // Check if car with carId was found and deleted
    if (!deletedCar) throw new NotFoundError("Car not found");

    // Delete car Image at cloudinary
    await deleteCloudinaryImage(deletedCar.imageCloudId);

    return res
      .status(200)
      .json(new ApiResponse("Car deleted successfully", null));
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json(new ApiResponse(error.message, null));
    } else if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json(new ApiResponse(validationErrors[0], null));
    }
  }
};

const deleteAllCars = async (req: Request, res: Response) => {
  try {
    // Retrieve imageCloudIds of all cars
    const carsToDelete = await CarModel.find({}, "imageCloudId");

    // Check if carImgCloudIds is empty
    if (carsToDelete.length === 0) throw new NotFoundError("No cars to delete");

    //delete all car Imgs at cloudinaryy
    await Promise.all(
      carsToDelete.map((car) => deleteCloudinaryImage(car.imageCloudId))
    );

    // Now delete all cars
    const deletedCars = await CarModel.deleteMany();

    return res
      .status(200)
      .json(new ApiResponse("Cars deleted successfully", null));
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json(new ApiResponse(error.message, null));
    } else if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json(new ApiResponse(validationErrors[0], null));
    }
  }
};
