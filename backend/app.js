import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {connection} from './database/connection.js';
import {errorMiddleware} from './middlewares/error.js';
import fileUpload from 'express-fileupload';


const app = express();

//To set up config path for .env file
config({path: "./config/config.env"});

//Setting the cors data
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
})
);


connection();
app.use(errorMiddleware);


export default app;