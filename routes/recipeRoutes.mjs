import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
    createRecipe,
    getRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
} from "../controllers/recipeController.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });
const router = express.Router();

router
    .route("/")
    .get(getRecipes)
    .post(protect, upload.single("image"), createRecipe);

router
    .route("/:id")
    .get(getRecipeById)
    .put(protect, upload.single("image"), updateRecipe)
    .delete(protect, deleteRecipe);

export default router;
