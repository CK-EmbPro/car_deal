import { Request, Response } from "express";
import { ICar, MulterRequest } from "../types";
import fs from "fs";
import { NotFoundError } from "../exceptions/errors";
import { uploadImage } from "../utils/uploadCloudinaryImage";
import { CarModel } from "../models/Car";
import mongoose from "mongoose";
import { deleteCloudinaryImage } from "../utils/deleteCloudinaryImage";
import { ApiResponse } from "../apiResponse/ApiResponse";
import { CLOUD_FOLDERS } from "../constants/cloudFolderNames";

export const addCar = async (req: MulterRequest, res: Response) => {
  try {
    const { name, price, category, description, isLiked } = req.body;
    const filePath = req.file?.path;
    // Check if file is provided
    if (!filePath || !fs.existsSync(filePath))
      throw new NotFoundError("No file  Uploaded");

    //Upload the file to cloudinary
    const { fileNameWithExtension, imagePublicId, imageUrl } =
      await uploadImage(CLOUD_FOLDERS.CARS_FOLDER, filePath);

    let savedCar = new CarModel({
      name,
      price,
      category,
      description,
      isLiked,
      carImageName: fileNameWithExtension,
      carImageCloudId: imagePublicId,
      carImageCloudUrl: imageUrl,
    });

    savedCar = await savedCar.save();

    return res
      .status(201)
      .json(new ApiResponse<ICar>("Car registered successfully", savedCar));
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json(new ApiResponse(error.message, null));
    } else if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json(new ApiResponse(validationErrors[0], null));
    } else if (error instanceof Error) {
      return res.status(500).json(new ApiResponse(error.message, null));
    }
  }
};

export const updateCar = async (req: MulterRequest, res: Response) => {
  try {
    let updatedCarData = req.body;
    const { carId } = req.params;
    const filePath = req.file?.path;

    // Get the car to update
    const carToUpdate = await CarModel.findById(carId);

    // Check if the car exists
    if (!carToUpdate) throw new NotFoundError("Car not found");

    // If new file is provided update
    let fileName;
    let imageCloudUrl;
    let imageCloudId;
    if (filePath) {
      let fileUploadResult = await uploadImage(
        CLOUD_FOLDERS.CARS_FOLDER,
        filePath
      );
      fileName = fileUploadResult.fileNameWithExtension;
      imageCloudId = fileUploadResult.imagePublicId;
      imageCloudUrl = fileUploadResult.imageUrl;
    }

    if (carToUpdate.carImageCloudId != imageCloudId) {
     
      await deleteCloudinaryImage(carToUpdate.carImageCloudId);
    }

    // Add car_image info to updating data
    updatedCarData = {
      ...updatedCarData,
      carImageName: fileName,
      carImageCloudId: imageCloudId,
      carImageCloudUrl: imageCloudUrl,
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
    } else if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json(new ApiResponse(validationErrors[0], null));
    } else if (error instanceof Error) {
      return res.status(500).json(new ApiResponse(error.message, null));
    }
  }
};

export const getSingleCar = async (req: Request, res: Response) => {
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
    } else if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(404).json(new ApiResponse(validationErrors[0], null));
    } else if (error instanceof Error) {
      return res.status(500).json(new ApiResponse(error.message, null));
    }
  }
};

export const getAllCars = async (req: Request, res: Response) => {
  try {
    const cars = await CarModel.find();
    return res
      .status(200)
      .json(new ApiResponse("Cars retrieved successfully", cars));
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json(new ApiResponse(validationErrors[0], null));
    }
    if (error instanceof Error) {
      return res.status(500).json(new ApiResponse(error.message, null));
    }
  }
};

export const deleteCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    // Delete car and return deleted car document
    const deletedCar = await CarModel.findByIdAndDelete(carId);

    // Check if car with carId was found and deleted
    if (!deletedCar) throw new NotFoundError("Car not found");

    // Delete car Image at cloudinary
    await deleteCloudinaryImage(deletedCar.carImageCloudId);

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
    } else if (error instanceof Error) {
      return res.status(500).json(new ApiResponse(error.message, null));
    }
  }
};

export const deleteAllCars = async (req: Request, res: Response) => {
  try {
    // Retrieve imageCloudIds of all cars
    const carsToDelete = await CarModel.find({}, "carImageCloudId");

    // Check if carImgCloudIds is empty
    if (carsToDelete.length === 0) throw new NotFoundError("No cars to delete");

    //delete all car Imgs at cloudinaryy
    await Promise.all(
      carsToDelete.map((car) => deleteCloudinaryImage(car.carImageCloudId))
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
    } else if (error instanceof Error) {
      return res.status(500).json(new ApiResponse(error.message, null));
    }
  }
};
