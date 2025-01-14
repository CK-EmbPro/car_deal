import { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_PHONENUMBER, ADMIN_PROFILE_PHOTO_CLOUD_ID, ADMIN_PROFILE_PHOTO_CLOUD_URL, ADMIN_PROFILE_PHOTO_NAME } from "../constants/envVariables";
import { UserModel } from "../models/User";
import dotenv from "dotenv"

dotenv.config()

export const seedAdminUser = async () => {
    try {
        const adminEmail = ADMIN_EMAIL; // Replace or load from environment
        const adminPassword = ADMIN_PASSWORD
        const existingAdmin = await UserModel.findOne({ email: adminEmail });
        if (existingAdmin) {
            return;
        }

        const adminUser = new UserModel({
            firstName: "Admin",
            lastName: "admin",
            email: adminEmail,
            phoneNumber: ADMIN_PHONENUMBER, // Replace with a valid phone number
            password: adminPassword, // Replace with a secure password
            profilePhotoName: ADMIN_PROFILE_PHOTO_NAME,
            profilePhotoCloudId: ADMIN_PROFILE_PHOTO_CLOUD_ID,
            profilePhotoCloudUrl: ADMIN_PROFILE_PHOTO_CLOUD_URL


        });

        await adminUser.save();

        console.log("Admin user created successfully.");

    } catch (error) {
        if(error instanceof Error){
            throw new Error(error.message)
        }
    }
};