import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    title: String,
    description: String,
    ingredients: [String],
    instructions: String,
    category: String,
    image: String,
    time : String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
