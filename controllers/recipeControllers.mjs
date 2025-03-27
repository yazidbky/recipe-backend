import Recipe from "../models/Recipe.mjs";



export const createRecipe = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("Uploaded File:", req.file);

        const { title, description, ingredients, instructions, category , time} = req.body;

        let imageUrl = null;
        if (req.file) {
            imageUrl = req.file.path; 
        }

        const recipe = new Recipe({
            title,
            description,
            ingredients,
            instructions,
            category,
            time,
            image: imageUrl,
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
        if (userId) query.createdBy = userId;

        const recipes = await Recipe.find(query)
            .populate('createdBy', 'name email image'); 
            
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id)
            .populate('createdBy', 'name email image');
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};




export const updateRecipe = async (req, res) => {
    try {
       
        const { title, description, ingredients, instructions, category, time } = req.body;
        
        console.log("Update Data:", req.body); 
        
        let updateData = {
            title,
            description,
            ingredients,
            instructions,
            category,
            time
        };

        if (req.file) {
            updateData.image = req.file.path;
        }

        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );
        
        if (!updatedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        
        res.json(updatedRecipe);
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ 
            message: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
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
