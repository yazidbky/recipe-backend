import mongoose from "mongoose";

export const recipeSchema = mongoose.Schema({
    title: String,
    description: String,
    ingredients: [String],
    instructions: [String],
    category: String,
    image: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

