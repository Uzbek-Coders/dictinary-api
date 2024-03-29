import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import Error from './src/model/Error.js'
import cors from "cors"
import {
    routes,
    authRoute,
    articleRoute
} from "./src/routes/indexRoute.js"
import { questionCreate, questionGet, questionGetID } from './src/controller/questionController.js'
const PORT = process.env.PORT || 4000;
const app = express();
import { ReadPDF, CreatePDF, FindPDF } from './src/controller/pdfcontroller.js'

app.get('/file/create', CreatePDF)
// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}));
// Routes
app.get('/', (req, res) => res.sendStatus(200)) // Server Status
app.use(routes)
app.use('/auth', authRoute)
app.get('/file/get/:id', FindPDF)
app.get('/file/get', ReadPDF)
app.get("/question/get", questionGet)
app.get("/question/get", questionGetID)
app.post("/question/create", questionCreate)
app.get("/question/get/:id", questionGetID)
app.use('/api/v1/blog', articleRoute)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
mongoose.set('strictQuery', false);
// Database connection and running server
try {
    (async () => {
        await mongoose.connect(process.env.DB_URI, {
            dbName: 'test', useNewUrlParser: true,
            useUnifiedTopology: true, })
        console.log("Database connected.")
        app.listen(PORT, () => console.log(`Server is running at ${PORT}`))
    })()
} catch (error) {
    (async () => {
        await new Error({ stack: error.stack }).save()
    })()
}

