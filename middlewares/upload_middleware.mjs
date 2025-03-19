import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "recipes", // Folder name in Cloudinary
    format: async (req, file) => "png", // Convert to PNG
    public_id: (req, file) => file.originalname.split(".")[0],
  },
});

// Multer setup
const upload = multer({ storage });

const debugUpload = (req, res, next) => {
  console.log("Multer File Data:", req.file);
  next();
};

export { upload , debugUpload };
