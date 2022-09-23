import mongoose from '../lib/db.js'
const {Schema, model} = mongoose

const eng_uzbSchema = new Schema({
    word:  {type: String, required: true },
    transc: {type: String, required: true },
    desc: {type: String, required: true },
});

const uzb_engSchema = new Schema({
    word: String,
    desc: String,
});


const eng_uzb = model('eng_uzb', eng_uzbSchema);
const uzb_eng = model('uzb_eng', uzb_engSchema);
 export {
    eng_uzb, uzb_eng 
}