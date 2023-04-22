import fs from 'fs';
import mongoose from 'mongoose';
import pdfToBase64 from 'pdf-to-base64';

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://asqararslonov2008:PythonC++@cluster0.n07w3jz.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a schema for the PDF document
const pdfSchema = new mongoose.Schema({
    name: String,
    base64: String,
});

const Pdf = mongoose.model('Pdf', pdfSchema);
mongoose.set('strictQuery', false);
// Read the PDF file and save it to MongoDB Atlas
const filename = 'example.pdf';

fs.readFile(filename, (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    pdfToBase64(data, (err, base64String) => {
        if (err) {
            console.error(err);
            return;
        }

        const pdf = new Pdf({
            name: filename,
            base64: base64String,
        });

        pdf.save((err, result) => {
            if (err) {
                console.error(err);
                return;
            }

            console.log('PDF saved to MongoDB Atlas:', result);
        });
    });
});
