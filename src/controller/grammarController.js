import mongoose from 'mongoose'
import Grammar from '../model/Grammar.js'
import Error from '../model/Error.js'


const create = async (req, res) => {
    try {
        const grammar = new Grammar(req.body)
        await grammar.save()
        res.status(201).json(grammar)
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError)
            res.status(400).json({ error: error.message })
        else
            await new Error({ stack: error.stack }).save()
    }
}


const read = async (req, res) => {
    try {
        const grammar = await Grammar
            .findById(req.params.id)
            .select('-__v')

        if (grammar)
            res.status(200).json(grammar)
        else
            res.sendStatus(404)
    } catch (error) {
        res.status(400).json({ error: error.message })
        await new Error({ stack: error.stack }).save()
    }
}


const many = async (req, res) => {
    try {
        const grammars = await Grammar.find()
            .sort('title')
            .select('-body -__v')

        res.status(200).json(grammars)
    } catch (error) {
        res.status(400).json({ error: error.message })
        await new Error({ stack: error.stack }).save()
    }
}


const updateOne = async (req, res) => {
    try {
        const grammar = await Grammar.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(grammar)
    } catch (error) {
        res.status(400).json({ error: error.message })
        await new Error({ stack: error.stack }).save()
    }
}


const deleteOne = async (req, res) => {
    try {
        const grammar = await Grammar.findByIdAndDelete(req.params.id)
        res.status(200).json(grammar)
    } catch (error) {
        res.status(400).json({ error: error.message })
        await new Error({ stack: error.stack }).save()
    }
}


const popular = async (req, res) => {
    try {
        const articles = await Grammar.find()
            .sort('title')
            .limit(10)
            .select('-body -views -tags -delete_urls -createdAt -updatedAt -__v')

        res.status(200).json(articles)
    } catch (error) {
        res.status(400).json({ error: error.message })
        await new Error({ stack: error.stack }).save()
    }
}


export { create, read, many, popular, updateOne, deleteOne }
