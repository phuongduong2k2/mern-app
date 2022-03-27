import express from "express";
const router = express.Router()
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth.js";
import User from "../models/User.js";
import Post from "../models/Post.js"

// @route GET api/auth
// @desc GET user
// @access Public
// Check Authicen
router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        if (!user) {
            return res.status(400).json({status: false, message: "User not found"})
        }
        return res.json({status: true, user})
    } catch (error) {
        console.log(error)
        res.status(500).json({status: false,message: "Internal server error"})
    }
})


// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
    const {username, password} = req.body

    // Simple validation
    if (!username || !password) {
        return res.status(400).json({status: false, message: "Missing username or password"})
    }
    try {
        // Check for existing username
        const user = await User.findOne({username})

        if (user)
        return res.status(400).json({status: false, message: "Username already exist"})
         
        // All good
        const newUser = new User({username, password})
        await newUser.save()

        // Return token
        const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)
        return res.json({status: true, message: "User created success", accessToken})
    } catch (error) {
        console.log(error)
        res.status(500).json({status: false,message: "Internal server error"})
    }
})

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', async(req, res) => {
    const {username, password} = req.body

    // Simple validation
    if (!username || !password) {
        return res.status(400).json({status: false, message: "Missing username or password"})
    }

    try {
        // Check for existing username
        const user = await User.findOne({username})
        if (!user) {
            return res.status(400).json({status: false, message: "Incorrect username or password"})
        }

        // Username found
        if (user.password !== password) {
            return res.status(400).json({status: false, message: "Incorrect username or password"})
        }

        // All good 
        // Return token
        const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET)
        return res.json({status: true, message: "Login success", accessToken, username})
    } catch (error) {
        console.log(error)
        res.status(500).json({status: false,message: "Internal server error"})
    }
})


// @route PUT api/auth/login
// @desc UPDATE User
// @access Public
router.put('/profile/:id', verifyToken, async(req, res) => {
    const { image, userId } = req.body
    try {

        // UPDATE IMG FOR USER
        let replacement = {
            image
        }

        const recent = {_id: userId}

        replacement = await User.findOneAndUpdate(
            recent, 
            replacement,
            { new: true }
        )
        
        // UPDATE IMG FOR USER'S POSTS
        const userPosts = await Post.findOne({ user: userId })
        if (userPosts) {
            const option = { multi: true, upsert: true, new: true }
            let replacementPost = { image }
            
            const recentPost = {user: userId}
            replacementPost = await Post.updateMany(
                recentPost,
                replacementPost,
                option
            )
        }
        
        if (!replacement || !userId) {
            return res.status(401).json({status: false, message: "User not found or user not authorised"})
        }

        res.json({status: true, message: "Upload success", image: replacement, req: userId})
    } catch (error) {
        console.log(error);
        res.status(500).json({status: false, message: "Internal server error!"})
    }
})


// CONVERT IMG TO BASE64
router.post('/profile', async(req, res) => {
    const { image } = req.body
    try {
        let replacement = {
            image
        }

        const recent = {user: req.userId}

        replacement = await User.findOneAndUpdate(
            recent, 
            replacement,
            { new: true }
        )
    
        if (!replacement) {
            return res.status(401).json({status: false, message: "User not found or user not authorised"})
        }

        res.json({status: true, message: "Upload success", image: replacement})
    } catch (error) {
        console.log(error);
        res.status(500).json({status: false, message: "Internal server error!"})
    }
})

export default router