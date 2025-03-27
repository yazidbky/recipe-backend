import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import recipeRoutes from "../routes/recipeRoutes.mjs";
import userRoutes from "../routes/userRoutes.mjs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url"; 


dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 



app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());


app.use("/api/recipes", recipeRoutes);
app.use("/api/users", userRoutes);





mongoose.connect(process.env.MONGO_URI ,)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

    const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

