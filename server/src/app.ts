import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import router from './router';
import swaggerUi from 'swagger-ui-express';
import openapiSpecification from './docs/swaggerDef';


const app: Application  = express();

dotenv.config()

const PORT = process.env.PORT;

console.log(JSON.stringify(openapiSpecification))

// SWAGGER
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(router);

export default app;