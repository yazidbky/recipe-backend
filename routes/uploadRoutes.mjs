import express from "express";
const router = express.Router();
import cloudinary from "../middlewares/cloudinary.mjs";
import { upload } from "../middlewares/multer.mjs";

router.post("/", upload.single("image"), async (req, res) => {
    console.log(req.file);
    cloudinary.uploader.upload(req.file.path, (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.status(201).json({ url: result.secure_url });
    });
});

export default router;