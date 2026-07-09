const mongoose = require('mongoose')

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    },

})
const testimonials = mongoose.model('testimonials', testimonialSchema)
module.exports = testimonials