import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'


import authRouter from './routes/auth.js'
import postRouter from './routes/post.js'
import imageRouter from './routes/image.js'

dotenv.config()
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-app.31oot.mongodb.net/mern-app?retryWrites=true&w=majority`)
        console.log("MongooseDB connected")
    } catch (error) {
        console.log("error api", error.message)
        process.exit(1)
    }
}

connectDB()

const app = express()
app.use(express.json())
app.use(cors())

import bodyParser from 'body-parser'
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "500mb", extended: true, parameterLimit:100000}));

app.use('/api/auth', authRouter, bodyParser.urlencoded({limit: "500mb", extended: true, parameterLimit:100000}))

app.use('/api/posts', postRouter, bodyParser.urlencoded({limit: "500mb", extended: true, parameterLimit:100000}))

// app.use('/img', imageRouter, bodyParser.urlencoded({limit: "500mb", extended: true, parameterLimit:100000}))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))