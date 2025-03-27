import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid"; 

dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    console.log("Incoming file:", file); 
    return {
      folder: "recipes",
      format: file.mimetype.split("/")[1],
      public_id: `${uuidv4()}-${file.originalname.split(".")[0]}`,
    };
  },
});



const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) { 
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  }
  
});




export { upload };
