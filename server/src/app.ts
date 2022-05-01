import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import router from './router';

const app: Application  = express();

dotenv.config()

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(router);

export default app;