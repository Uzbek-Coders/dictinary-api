import mongoose from 'mongoose'


const errorSchema = new mongoose.Schema({
    stack: String
}, { timestamps: true, collection: 'errors' })


export default mongoose.model('Error', errorSchema)
