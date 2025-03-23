import Recipe from "../models/Recipe.mjs";



export const createRecipe = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("Uploaded File:", req.file);

        const { title, description, ingredients, instructions, category , time} = req.body;

        let imageUrl = null;
        if (req.file) {
            imageUrl = req.file.path; // Cloudinary returns the URL in req.file.path
        }

        const recipe = new Recipe({
            title,
            description,
            ingredients,
            instructions,
            category,
            time,
            image: imageUrl, // Save Cloudinary URL
            createdBy: req.user.id,
        });

        await recipe.save();
        res.status(201).json(recipe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getRecipes = async (req, res) => {
    try {
        const { search, category, userId } = req.query;

        const query = {};
        if (search) query.title = { $regex: search, $options: "i" };
        if (category) query.category = category;
        if (userId) query.createdBy = userId; // Filter by user ID

        const recipes = await Recipe.find(query);
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateRecipe = async (req, res) => {
    try {
        const { title, description, ingredients, instructions, category } = req.body;

        let imageUrl = null;
        if (req.file) {
            imageUrl = req.file.path; // Cloudinary image URL
        }

        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                ingredients,
                instructions,
                category,
                time,
                ...(imageUrl && { image: imageUrl }), // Update image only if provided
            },
            { new: true }
        );

        res.json(updatedRecipe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


export const deleteRecipe = async (req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.id);
        res.json({ message: "Recipe deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
