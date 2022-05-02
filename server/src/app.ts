import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './router';
import swaggerUi from 'swagger-ui-express';
import openapiSpecification from './docs/swaggerDef';

const app: Application  = express();


// SWAGGER
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(router);

export default app;