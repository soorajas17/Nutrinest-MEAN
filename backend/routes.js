const express = require('express')
const { registerController, loginController, profileUpdateController, getAllUsersController, getAllDownloadController } = require('./controller/userController')
const { getHomeRecipesController, getAllRecipesController, getARecipeController, addRecipeController, deleteRecipeController } = require('./controller/recipeController')
const jwtMiddleware = require('./middlewares/jwtMiddleware')
const { addSavedRecipeController, getAllSavedRecipeController, deleteASavedRecipeController } = require('./controller/savedRecipeController')
const { addToDownloadRecipeController, getAllDownloadRecipeController } = require('./controller/downloadRecipeController')
const { addTestimonialController, getAllTestimonialController, updateTestimonialsController } = require('./controller/testimonialController')

const route = new express.Router()

// ------------------users-------------
// register
route.post('/user-register', registerController)
// login
route.post('/user-login', loginController)
// home recipes
route.get('/home-recipes', getHomeRecipesController)
// allRecipes
route.get('/all-recipes', getAllRecipesController)
// get a recipe
route.get('/view-recipe/:id', getARecipeController)
// add-saved recipe
route.post('/add-savedrecipe/:id', jwtMiddleware, addSavedRecipeController)
// get-saved recipe
route.get('/all-savedrecipes', jwtMiddleware, getAllSavedRecipeController)
// delete-saved recipe
route.delete('/delete-savedrecipes/:id', jwtMiddleware, deleteASavedRecipeController)
// path to addRecipe to dwnld
route.post('/download-recipe/:recipeId', jwtMiddleware, addToDownloadRecipeController)
// get user dwnl recipe
route.get('/all-user-downloads', jwtMiddleware, getAllDownloadRecipeController)
// add Testimonial
route.post('/add-testimonial', addTestimonialController)
// update Profile
route.put('/update-profile', jwtMiddleware, profileUpdateController)


// -----------admin--------------------
// get all users
route.get('/get-allusers', getAllUsersController)
// get all downloads
route.get('/get-alldownloads', getAllDownloadController)
// get all testimonials
route.get('/all-testimonials', getAllTestimonialController)
// update testimonials
route.put('/update-testimonials', updateTestimonialsController)
// path to add recipe
route.post('/add-recipe', addRecipeController)
// path to delete a recipe
route.delete('/delete-recipe/:id', deleteRecipeController)





module.exports = route