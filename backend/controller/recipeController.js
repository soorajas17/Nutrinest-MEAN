const recipes = require("../models/recipeModel")


// All recipes controller
exports.getAllRecipesController = async (req, res) => {
    try {
        const allRecipes = await recipes.find()
        res.status(200).json(allRecipes)
    } catch (error) {
        res.status(500).json(error)
    }
}

// home recipes controller
exports.getHomeRecipesController = async (req, res) => {
    try {
        const allRecipes = await recipes.find().limit(3)
        res.status(200).json(allRecipes)
    } catch (error) {
        res.status(500).json(error)
    }
}

// get a recipe
exports.getARecipeController = async (req, res) => {
    const { id } = req.params
    try {
        const recipe = await recipes.findOne({ _id: id })
        res.status(200).json(recipe)
    } catch (error) {
        res.status(500).json(error)
    }
}

// addRecipe controller
exports.addRecipeController = async (req, res) => {
    const { name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, cuisine, caloriesPerServing, mealType, image } = req.body
    console.log(name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, cuisine, caloriesPerServing, mealType, image);
    try {
        const newRecipe = new recipes({
            name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, cuisine, caloriesPerServing, mealType, image
        })
        await newRecipe.save()
        res.status(200).json(newRecipe)
    } catch (error) {
        res.status(500).json(error)
    }
}

// delete a recipe
exports.deleteRecipeController = async (req, res) => {
    const { id } = req.params
    console.log(id);
    try {
        await recipes.findByIdAndDelete({ _id: id })
        res.status(200).json()
    } catch (error) {
        res.status(500).json(error)
    }

}
