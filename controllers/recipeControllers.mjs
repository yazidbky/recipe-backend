import Recipe from "../models/Recipe.mjs";

export const createRecipe = async (req, res) => {
    try {
        const { title, description, ingredients, instructions, category } = req.body;
        const image = req.file ? req.file.filename : null;

        const recipe = new Recipe({
            title,
            description,
            ingredients,
            instructions,
            category,
            image,
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
        const { search, category } = req.query;

        const query = {};
        if (search) query.title = { $regex: search, $options: "i" };
        if (category) query.category = category;

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
        const image = req.file ? req.file.filename : null;

        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                ingredients,
                instructions,
                category,
                image,
            },
            { new: true }
        );

        res.json(updatedRecipe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteRecipe = async (req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.id);
        res.json({ message: "Recipe deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
