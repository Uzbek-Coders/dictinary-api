import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser'
import {routes, authRoute} from "./routes/indexRoute.js"
const PORT = process.env.PORT || 4000;
const app = express();

// Middlewares
app.use(cors())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.json())
// app.use(bodyParser.json());     
app.use(routes);
app.use("/auth", authRoute);


app.listen(PORT, () => console.log(`Server is running at ${PORT}`))

