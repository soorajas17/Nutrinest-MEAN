const { default: mongoose } = require("mongoose");


const savedRecipeSchema = new mongoose.Schema({
    recipeId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})

const savedRecipes = mongoose.model("savedRecipes", savedRecipeSchema)
module.exports = savedRecipes