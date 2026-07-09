const mongoose = require('mongoose')

const downloadSchema = new mongoose.Schema({
    recipeId: {
        type: String,
        required: true
    },
    recipeName: {
        type: String,
        required: true
    },
    recipeImage: {
        type: String,
        required: true
    },
    cuisine: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
})

const downloads = mongoose.model('downloads', downloadSchema)
module.exports = downloads