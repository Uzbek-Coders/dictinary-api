import mongoose from 'mongoose'


const articleSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
        minLength: 1,
        maxLength: 255,
        trim: true
    },
    body: {
        required: true,
        type: String,
        minLength: 1,
        maxLength: 4096,
        trim: true
    },
    views: {
        type: Number,
        default: 0
    },
    tags: [{
        required: true,
        type: String,
        minLength: 1,
        maxLength: 255
    }],
    thumbnail: {
        type: String,
        minLength: 30,
        maxLength: 255
    },
    delete_urls: [{
        required: true,
        type: String,
        minLength: 30,
        maxLength: 255
    }]
}, { timestamps: true, collection: 'articles' })


export default mongoose.model('Article', articleSchema)
