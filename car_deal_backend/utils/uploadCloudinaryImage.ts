import fs from "fs";
import cloudinary from "../config/cloudinaryConfig";
import path from "path";

export const uploadImage = async (cloudFolder:string,filePath: string) => {
  try {
    const fileNameWithExtension = path.basename(filePath);
    // now remove the file extension
    const onlyFileName = path
      .parse(fileNameWithExtension)
      .name.replace(/\s+/g, "");

    // Search if the uploaded file exists there at cloudinary
    const existingImage = await cloudinary.search
      .expression(`folder:${cloudFolder} AND filename:${onlyFileName}`)
      .max_results(1)
      .execute();

    // Check if the uploaded file truly exists
    if (existingImage.resources[0]) {
      const matchedImage = existingImage.resources[0];
      fs.unlinkSync(filePath);
      const containingDirectoryPath = path.dirname(filePath);
      fs.rmSync(containingDirectoryPath, { recursive: true, force: true });

      return {
        imageUrl: matchedImage.secure_url,
        imagePublicId: matchedImage.public_id,
        fileNameWithExtension,
      };
    }

    // Now upload the image to the cloudinary if is not there
    const result = await cloudinary.uploader.upload(filePath, {
      folder: cloudFolder,
      use_filename: true,
      unique_filename: false,
    });

    fs.unlinkSync(filePath);
    const containingDirectoryPath = path.dirname(filePath);
    fs.rmSync(containingDirectoryPath, { recursive: true, force: true });

    return {
      imageUrl: result.secure_url,
      imagePublicId: result.public_id,
      fileNameWithExtension,
    };
  } catch (error) {
    throw error;
  }
};
