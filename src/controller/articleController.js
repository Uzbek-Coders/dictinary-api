import mongoose from 'mongoose'
import Article from '../model/Article.js'
import Error from '../model/Error.js'


const create = async (req, res) => {
    try {
        const article = new Article(req.body)
        await article.save()
        res.status(201).json(article)
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError)
            res.status(400).json({ error: error.message })
        else
            await new Error({ stack: error.stack }).save()
    }
}


const read = async (req, res) => {
    try {
        const article = await Article
            .findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, { new: true })
            .select('-__v')

        if (article)
            res.status(200).json(article)
        else
            res.sendStatus(404)
    } catch (error) {
        await new Error({ stack: error.stack }).save()
    }
}


const many = async (req, res) => {
    try {
        const articles = await Article
            .find()
            .sort('-createdAt')
            .skip((req.query.page - 1) * req.query.limit)
            .limit(req.query.limit)
            .select('-__v')


        res.status(200).json(articles)
    } catch (error) {
        await new Error({ stack: error.stack }).save()
    }
}


const tag = async (req, res) => {
    try {
        const articles = await Article
            .find({ tags: { $in: req.params.tag } })
            .sort('-createdAt')
            .skip((req.query.page - 1) * req.query.limit)
            .limit(req.query.limit)
            .select('-__v -tags -images.original -images.medium -images._id')

        if (articles?.length)
            res.status(200).json(articles)
        else
            res.sendStatus(404)
    } catch (error) {
        await new Error({ stack: error.stack }).save()
    }
}


const updateOne = async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(article)
    } catch (error) {
        res.status(400).json({ error: error.message })
        await new Error({ stack: error.stack }).save()
    }
}


const deleteOne = async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id)
        res.status(200).json(article)
    } catch (error) {
        res.status(400).json({ error: error.message })
        await new Error({ stack: error.stack }).save()
    }
}


export { create, read, many, tag, updateOne, deleteOne }
