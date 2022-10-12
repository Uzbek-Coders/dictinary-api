import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import Error from './src/model/Error.js'
import {
    routes,
    authRoute,
    articleRoute
} from "./src/routes/indexRoute.js"


const PORT = process.env.PORT || 4000
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.get('/', (req, res) => res.sendStatus(200)) // Server Status
app.use(routes)
app.use('/auth', authRoute)
app.use('/api/v1/blog', articleRoute)

// Database connection and running server
try {
    (async () => {
        await mongoose.connect(process.env.DB_URI, { dbName: 'test' })
        console.log("Database connected.")
        app.listen(PORT, () => console.log(`Server is running at ${PORT}`))
    })()
} catch (error) {
    (async () => {
        await new Error({ stack: error.stack }).save()
    })()
}
