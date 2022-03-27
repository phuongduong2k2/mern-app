import mongoose from "mongoose";
const Schema = mongoose.Schema

const ImageSchema = new Schema({
    image: {
        data: Buffer,
        contentType: String
    }
})

export default mongoose.model('image', ImageSchema)