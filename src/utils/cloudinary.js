import { v2 as cloudinary } from "cloudinary";

export class Cloudinary {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const uploadOnCloudinary = async (localFilePath) => {
      try {
        if (!localFilePath) {
          return null;
        }

        //upload file on coloudinary
        //
        const response = await cloudinary.uploader.upload(localFilePath, {
          resource_type: "auto",
        });
        console.log(response.url);
        //file has been uploaded sucessfully
        console.log("File is uploaded on cloudinary");
        return response;
      } catch (e) {
        fs.unlinkSync(localFilePath); //remove the locally saved temporary file as the upload operation got failed
      }
    };
  }
}
