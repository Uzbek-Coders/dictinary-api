import express from 'express';
import routes from './src/routes/word-routes.js'
import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser'
const PORT = process.env.PORT || 4000;
const app = express();

// Middlewares

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(express.json())
app.use(bodyParser.json());     
app.use(routes);


app.listen(PORT, () => console.log(`Server is running at ${PORT}`))

