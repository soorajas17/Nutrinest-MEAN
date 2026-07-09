const downloads = require("../models/downloadRecipeModel");


exports.addToDownloadRecipeController = async (req, res) => {
    const { name, image, cuisine } = req.body
    const userId = req.payload
    const { recipeId } = req.params
    console.log(recipeId, userId, name, image, cuisine);

    try {
        const existingRecipe = await downloads.findOne({ userId, recipeId })
        if (existingRecipe) {
            existingRecipe.count += 1
            await existingRecipe.save()
            res.status(200).json(existingRecipe)
        } else {
            const newRecipe = new downloads({
                recipeId, recipeName: name, recipeImage: image, cuisine, count: 1, userId
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// get all dwnl recipe
exports.getAllDownloadRecipeController = async (req, res) => {
    const userId = req.payload
    try {
        const allUserDownloadRecipe = await downloads.find({ userId })
        res.status(200).json(allUserDownloadRecipe)
    } catch (error) {
        res.status(500).json(error)
    }
}