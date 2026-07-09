const users = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const downloads = require("../models/downloadRecipeModel");

// register
exports.registerController = async (req, res) => {
    const { username, email, password } = req.body
    console.log(username, email, password);
    try {
        const existingUser = await users.findOne({ email })

        if (existingUser) {
            res.status(406).json("User already Exist..")
        } else {
            const encryptedPassword = await bcrypt.hash(password, 10)
            console.log(encryptedPassword);
            const newUser = new users({
                username,
                email,
                password: encryptedPassword
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// login
exports.loginController = async (req, res) => {
    const { email, password } = req.body
    console.log(email, password);

    try {
        const existingUser = await users.findOne({ email })
        console.log(existingUser);
        if (existingUser) {
            const confirmPswd = await bcrypt.compare(password, existingUser.password)
            console.log(confirmPswd);
            if (confirmPswd) {
                const token = jwt.sign({ userId: existingUser._id }, process.env.SECRETKEY)
                res.status(200).json({ existingUser, token })
            } else {
                res.status(401).json("Invalid credentials..")
            }
        } else {
            res.status(406).json("Account doesn't exist Please login!")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// update profile
exports.profileUpdateController = async (req, res) => {
    const userId = req.payload
    console.log(userId);
    const { profileimage } = req.body
    try {
        const existingUser = await users.findOne({ _id: userId })
        const profile = await users.findByIdAndUpdate({ _id: userId }, {
            username: existingUser.username,
            email: existingUser.email,
            password: existingUser.password,
            role: existingUser.role,
            profileImage: profileimage
        }, { new: true })

        await profile.save()
        res.status(200).json(profile)
    } catch (error) {
        res.status(500).json(error)
    }
}

// ------------------admin--------------------
exports.getAllUsersController = async (req, res) => {

    try {
        let query = {
            role: {
                $ne: 'admin'
            }
        }
        const allusers = await users.find(query)
        res.status(200).json(allusers)
    } catch (error) {
        res.status(500).json(error)
    }
}

// getAll downloads
exports.getAllDownloadController=async(req,res)=>{
    try {
        const allDownloads=await downloads.find()
        res.status(200).json(allDownloads)
    } catch (error) {
        res.status(500).json(error)
    }
}