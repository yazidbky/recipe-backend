import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRoutes from "../routes/userRoutes.mjs";

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err.message));

// Optional Mongoose event listeners for better debugging
mongoose.connection.on('connected', () => console.log('✅ Mongoose is connected to MongoDB'));
mongoose.connection.on('error', err => console.error('❌ Mongoose connection error:', err.message));
mongoose.connection.on('disconnected', () => console.warn('⚠️ Mongoose disconnected'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
