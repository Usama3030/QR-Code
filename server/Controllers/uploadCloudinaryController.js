const cloudinary = require("cloudinary").v2;
const fs = require("fs");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath); // Delete local file after successful upload
    return response.url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error); // Log the error details
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); // Ensure the local file is deleted in case of an error
    }
    throw new Error("Failed to upload file to Cloudinary."); // Throw error to be caught by the route handler
  }
};

module.exports = { uploadOnCloudinary };
