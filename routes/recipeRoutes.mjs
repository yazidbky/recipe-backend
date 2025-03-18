import express from "express";
import { protect } from "../middlewares/auth_middlewares.mjs";
import {
    createRecipe,
    getRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
} from "../controllers/recipeControllers.mjs";
import upload from "../middlewares/uploadMiddleware.mjs"; // Import multer config

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
