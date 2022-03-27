import express from "express";
const router = express.Router()

import Post from '../models/Post.js'
import verifyToken from '../middleware/auth.js'

// @route GET api/post
// @desc get Posts
// @access Public
router.get('/all', async (req, res) => {
    try {
        const posts = await Post.find()
        return res.json({status: true, posts})
    } catch (error) {
        console.log(error)
        return res.status(400).json({status: false, message: "Interval server error"})
    }
})

// @route GET api/post
// @desc get Post 
// @access Private
router.get('/', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({user: req.userId}).populate('user', ['username'])
        return res.json({status: true, posts})
    } catch (error) {
        console.log(error)
        return res.status(500).json({status: false, message: "Interval server error"})
    }
})

// @route POST api/post
// @desc create Post 
// @access Private
router.post('/', verifyToken, async (req, res) => {
    const {title, description, username, image} = req.body
    
    // Simple validation
    if (!title) {
        return res.status(400).json({status: false, message: "Title is required"})
    }
    
    try {
        const newPost = new Post({
            title, 
            description,
            user: req.userId,
            username,
            image
        })
        await newPost.save()
        return res.json({status: true, message: "Created post success", post: newPost})
    } catch (error) {
        console.log(error)
        return res.status(500).json({status: false, message: "Internal server error"})
    }
})

// @route PUT api/post
// @desc update Post 
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
    const {title, description} = req.body

    // Simple validation
    if (!title) {
        return res.status(400).json({status: false, message: "Title is required"})
    }

    try {
        let updatePost = {
            title, 
            description: description || "",
        }

        const postUpdateCondition = {_id: req.params.id, user: req.userId}

        updatePost = await Post.findOneAndUpdate(
            postUpdateCondition, 
            updatePost, 
            {new: true}
        )

        // User not authoried to update or post not found
        if (!updatePost) {
            return res.status(401).json({status: false, message: `Post not found or user not authoried ${req.userId} ${req.params.id}`})
        }

        return res.json({status: true, message: "Update post success", updatePost})
    } catch (error) {
        console.log(error)
        return res.status(500).json({status: false, message: "Internal server error"})
    }
})

// @route DELETE api/post
// @desc delete Post 
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const postDeleteCondition = {_id: req.params.id, user: req.userId}
        const deletePost = await Post.findOneAndDelete(postDeleteCondition)

        // User not authoried or post not found
        if (!deletePost) {
            return res.status(401).json({status: false, message: "Post not found or user not authoried"})
        }

        return res.json({status: true, message: "Delete post success"})
    } catch (error) { 
        console.log(error)
        return res.status(500).json({success: false, message: "Internal server error"})
    }
})

export default router