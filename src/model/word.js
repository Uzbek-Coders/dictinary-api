import mongoose from 'mongoose'


const eng_uzbSchema = new mongoose.Schema({
    word: {
        required: true,
        type: String
    },
    transc: {
        required: true,
        type: String
    },
    desc: {
        required: true,
        type: String
    }
})


const uzb_engSchema = new mongoose.Schema({
    word: String,
    desc: String,
})


const eng_uzb = mongoose.model('eng_uzb', eng_uzbSchema)
const uzb_eng = mongoose.model('uzb_eng', uzb_engSchema)


export { eng_uzb, uzb_eng }
