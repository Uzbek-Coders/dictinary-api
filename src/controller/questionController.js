import question from "../model/question.js";


// CREATE
const questionCreate = async (req, res) => { 
    try {
     console.log(req.body)
         let newQuestion = new question(req.body);
         await newQuestion.save();

         console.log(newQuestion);
         return res.json({
             ok: true,
             data: newQuestion,
         });
    
    } catch (error) {
        console.log(error)
 } 
}
// Get
const questionGet = async (req, res) => { 
    try {
        console.log("hello node")
        res.send(req.body)
    } catch (error) {

    }
}
// GetID
const questionGetID = async (req, res) => { 
    try {
        console.log(req.params.id)
        const id = await question.find({}, { array: req.params.id })
        const result = await question.findOne({ _id: id })
        // console.log(result)
        return res.send({data: result})
    } catch {
        
    }
}

export { questionCreate, questionGet, questionGetID }