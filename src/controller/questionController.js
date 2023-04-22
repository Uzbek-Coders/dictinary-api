import question from "../model/question.js";
import fs from "fs"

// CREATE
const questionCreate = async (req, res) => { 
    try {
        for (let i = 1; i < 137; i++) {
            const data = JSON.parse(fs.readFileSync(`C:\\Users\\asqar\\Documents\\dictinary-api-master\\Codes\\Unit-${i} code.txt`, 'utf8'))
            // return res.send( data) 
            //  console.log(req.body)
            let newQuestion = new question(data);
            await newQuestion.save();

            console.log(newQuestion);
        }
         return res.send("Done!");
    
    } catch (error) {
        console.log(error)
 } 
}
// Get
const questionGet = async (req, res) => { 
    try {
        console.log("hello node")
        res.json(await question.find())
    } catch (error) {

    }
}
// GetID
const questionGetID = async (req, res) => { 
    try {
        console.log(req.params.id)
        const result = await question.findOne({ quizTitle: `Unit ${req.params.id}` })
        // console.log(result)
        return res.json({data: result})
    } catch {
        
    }
}

export { questionCreate, questionGet, questionGetID };
