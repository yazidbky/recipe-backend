import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import recipeRoutes from "../routes/recipeRoutes.mjs";
import userRoutes from "../routes/userRoutes.mjs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url"; // Import fileURLToPath

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url); // Get current file path
const __dirname = path.dirname(__filename); // Get current directory

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/recipes", recipeRoutes);
app.use("/api/users", userRoutes);

// Validate MongoDB URI
if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI is not defined in .env file");
    process.exit(1);
}

// Connect to MongoDB & Start Server
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("✅ MongoDB Connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit process on failure
});
