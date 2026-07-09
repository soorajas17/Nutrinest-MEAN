const savedRecipes = require("../models/saveRecipeModel");

// add saved recipe
exports.addSavedRecipeController = async (req, res) => {
    const { id } = req.params
    const { name, image } = req.body
    const userId = req.payload
    console.log(id, name, image, userId);

    try {
        const existingUser = await savedRecipes.findOne({ recipeId: id, userId })
        if (existingUser) {
            res.status(406).json("Recipe already added ")
        } else {
            const newRecipe = new savedRecipes({
                recipeId: id, name, image, userId
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// get saved recipe
exports.getAllSavedRecipeController = async (req, res) => {
    const userId = req.payload
    console.log(userId);

    try {
        const allSavedRecipes = await savedRecipes.find({ userId })
        res.status(200).json(allSavedRecipes)
    } catch (error) {
        res.status(500).json(error)
    }
}

// delete saved recipe
exports.deleteASavedRecipeController = async (req, res) => {
    const { id } = req.params
    try {
        await savedRecipes.findByIdAndDelete({ _id: id })
        res.status(200).json("Deleted")
    } catch (error) {
        res.status(500).json(error)
    }
}
