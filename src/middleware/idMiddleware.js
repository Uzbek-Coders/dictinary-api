import { Types } from 'mongoose'


const validateID = (req, res, next) => {
    if (Types.ObjectId.isValid(req.params.id))
        next()
    else
        res.status(400).json({ error: "ID is not valid!" })
}


export default validateID
