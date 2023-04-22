import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
    name: String,
    base64: String,
});

const Pdf = mongoose.model('Pdf', pdfSchema);


export default Pdf