import { v2 as cloudinary } from "cloudinary";
import exp from "constants";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_KEY_SECRET,
});

const uploadOnCloudinary = async (localfilepath) => {
  try {
    if (!localfilepath) return null;

    //uploading the file on cloudinary
    const response = await cloudinary.uploader.upload(localfilepath, {
      resource_type: "auto",
    });

    //if file as uploaded successfully

    console.log("File uploaded Successfully", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localfilepath); //removes locally saved temp file as upload operation failed
  }
};

export { uploadOnCloudinary };
