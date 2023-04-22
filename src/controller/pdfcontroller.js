import pdf from "../model/PDF.js";
import pdf2base64 from 'pdf-to-base64';
import open from 'open';

// CREATE PDF

function CreatePDF() {
    for (let i = 1; i < 137; i++) {
        const filename = `PDF/Unit ${i}.pdf`
        
    
        pdf2base64(filename).then((base64String) => {
            const pdf1 = new pdf({
                id: i,
                name: i,
                base64: base64String,
            });

            pdf1.save((err, result) => {
                if (err) {
                    console.error(err);
                    return;
                }

                console.log('PDF saved to MongoDB Atlas:', result);
            });
        });
    }
}

// READ PDF

async function ReadPDF(req, res) { 
    // pdf.find({}, (err, result) => {
    //     if (err) {
    //         console.error(err);
    //         return;
    //     }
    //     console.log('PDF found in MongoDB Atlas:', result);
    // });
    res.send(await pdf.find())
}

async function FindPDF(req, res) { 
    const pdf1 = await pdf.findOne({ name: `${req.params.id}` });
    if (!pdf1) return res.status(404).send('The PDF with the given name was not found.');
    res.send(pdf1);
}
export { CreatePDF, ReadPDF, FindPDF }