import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
export class Cloudinary {
  constructor() {
    cloudinary.config({
      cloud_name: "dvop7f7rj",
      api_key: "671931487883488",
      api_secret: "IhxP6rKzy0JpXbq1zVaKMIr8XIo",
    });
  }
  uploadOnCloudinary = async (localFilePath) => {
    try {
      if (!localFilePath) {
        return null;
      }
      const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto",
      });
      console.log("Uploaded URL:", response.secure_url); // Debugging

      return response.secure_url; // Ensure function returns URL
    } catch (e) {
      console.error("Cloudinary Upload Error:", e);
      fs.unlinkSync(localFilePath);
      return null; // Return null to handle failure
    }
  };
}

// cloudinary.js
export const uploadCloudinary = new Cloudinary().uploadOnCloudinary;
