import mongoose from 'mongoose'


const grammarSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
        trim: true,
        minLength: 1,
        maxLength: 255
    },
    body: {
        required: true,
        type: String,
        trim: true,
        minLength: 1,
        maxLength: 32767
    },
    parent: {
        type: String,
        trim: true,
        maxLength: 255
    }
}, { timestamps: true, collection: 'grammar' })


export default mongoose.model('Grammar', grammarSchema)
