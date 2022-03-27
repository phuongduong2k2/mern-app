import express from "express"
import multer from "multer"
const router = express.Router()
import Image from "../models/Image.js"

const Storage = multer.diskStorage({
    destination: 'upload',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: Storage
}).single('saveImage')

router.post('/', async (req, res) => {
    upload(req, res, (err) => {
        if (err) return console.log(err);
    })
    try {
        const newImage = new Image({
            image: {
                data: req.file.fieldname,
                contentType: 'image/png '
            }
        })
        await newImage.save()
        return res.json({status: true, message: "Upload image success"})
    } catch (error) {
        console.log(error);
        res.status(500).json({status: false, message: "Interval server error"})
    }
})

export default router