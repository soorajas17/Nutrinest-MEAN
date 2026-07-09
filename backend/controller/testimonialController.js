const testimonials = require("../models/testimonialModel");


exports.addTestimonialController = async (req, res) => {
    const { name, email, message } = req.body
    console.log(name.email, message);
    try {
        const userTestimonials = new testimonials({
            name, email, message
        })
        await userTestimonials.save()
        res.status(200).json(userTestimonials)
    } catch (error) {
        res.status(500).json(error)
    }
}

// getAll testimonials
exports.getAllTestimonialController = async (req, res) => {
    try {
        const allTestimonials = await testimonials.find()
        res.status(200).json(allTestimonials)
    } catch (error) {
        res.status(500).json(error)
    }
}

// update testimonials
exports.updateTestimonialsController = async (req, res) => {
    const { id, status } = req.body
    try {
        // const existingTestimonial = await testimonials.findOne({ _id: id })
        const updatedTestimonial = await testimonials.findByIdAndUpdate({ _id: id }, {
            // name: existingTestimonial.name,
            // email: existingTestimonial.email,
            // message: existingTestimonial.message,
            status
        }, { new: true })
        res.status(200).json(updatedTestimonial)
    } catch (error) {
        res.status(500).json(error)
    }
}