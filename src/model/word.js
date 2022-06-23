import mongoose from '../lib/db.js'
const {Schema, model} = mongoose

const eng_uzbSchema = new Schema({
    word: String,
    transc: String,
    desc: String,
    updatedBy: {type: String, default: null },
    createdDate: { type: Date, default: Date.now() },
    updatedDate: { type: Date, default: null },
});

const uzb_engSchema = new Schema({
    word: String,
    desc: String,
    createdBy: String,
    updatedBy: String,
    createdDate: Date,
    updatedDate: Date,
});


const eng_uzb = model('eng_uzb', eng_uzbSchema);
const uzb_eng = model('uzb_eng', uzb_engSchema);
 export {
    eng_uzb, uzb_eng 
}