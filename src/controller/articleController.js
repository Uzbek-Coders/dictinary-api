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
        res.status(400).json({ error: error.message })
        await new Error({ stack: error.stack }).save()
    }
}


const many = async (req, res) => {
    try {
        const { limit, page } = req.query

        const articlesQuery = [
            { $sort: { createdAt: -1 } },
            { $unset: ['body', 'tags', 'delete_urls', 'updatedAt', '__v'] },
        ]

        if (page > 0 && limit > 0)
            articlesQuery.push(
                { $skip: (((req.query.page - 1) * req.query.limit) || 0) },
                { $limit: parseInt(req.query.limit) || 0 }
            )

        const data = await Article.aggregate([
            {
                $facet: {
                    articles: articlesQuery,
                    info: [
                        { $count: "totalDocuments" }
                    ]
                }
            }
        ])

        res.status(200).json(data[0])
    } catch (error) {
        res.status(400).json({ error: error.message })
        await new Error({ stack: error.stack }).save()
    }
}


const byTag = async (req, res) => {
    try {
        const { limit, page } = req.query

        const articlesQuery = [
            { $sort: { createdAt: -1 } },
            { $unset: ['body', 'tags', 'delete_urls', 'updatedAt', '__v'] },
        ]

        if (page > 0 && limit > 0)
            articlesQuery.push(
                { $skip: (((req.query.page - 1) * req.query.limit) || 0) },
                { $limit: parseInt(req.query.limit) || 0 }
            )

        const data = await Article.aggregate([
            { $match: { tags: { $in: [req.params.tag] } } },
            {
                $facet: {
                    articles: articlesQuery,
                    info: [
                        { $count: "totalDocuments" }
                    ]
                }
            }
        ])

        res.status(200).json(data[0])
    } catch (error) {
        res.status(400).json({ error: error.message })
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


const popular = async (req, res) => {
    try {
        const articles = await Article.find()
            .sort('-views -createdAt')
            .limit(2)
            .select('-body -views -tags -delete_urls -createdAt -updatedAt -__v')

        res.status(200).json(articles)
    } catch (error) {
        res.status(400).json({ error: error.message })
        await new Error({ stack: error.stack }).save()
    }
}


const tags = async (req, res) => {
    try {
        const articles = await Article.aggregate([
            { $sort: { createdAt: -1 } },
            { $limit: 10 },
            { $unwind: '$tags' }, { $sortByCount: '$tags' }
        ])

        res.status(200).json(articles)
    } catch (error) {
        res.status(400).json({ error: error.message })
        await new Error({ stack: error.stack }).save()
    }
}


const search = async (req, res) => {
    try {
        const { limit, page } = req.query

        const articlesQuery = [
            { $sort: { createdAt: -1 } },
            { $unset: ['body', 'tags', 'delete_urls', 'updatedAt', '__v'] },
        ]

        if (page > 0 && limit > 0)
            articlesQuery.push(
                { $skip: (((req.query.page - 1) * req.query.limit) || 0) },
                { $limit: parseInt(req.query.limit) || 0 }
            )

        const data = await Article.aggregate([
            { $match: { title: { $regex: req.params.text, $options: 'i' } } },
            {
                $facet: {
                    articles: articlesQuery,
                    info: [
                        { $count: "totalDocuments" }
                    ]
                }
            }
        ])

        res.status(200).json(data[0])
    } catch (error) {
        res.status(400).json({ error: error.message })
        await new Error({ stack: error.stack }).save()
    }
}


const admin = async (req, res) => {
    try {
        const articles = await Article
            .find()
            .sort('-createdAt')
            .select('-__v')

        res.status(200).json(articles)
    } catch (error) {
        res.status(400).json({ error: error.message })
        await new Error({ stack: error.stack }).save()
    }
}


export { admin, many, popular, read, search, tags, byTag, create, updateOne, deleteOne }
