import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './router';
import swaggerUi from 'swagger-ui-express';
import openapiSpecification from './docs/swaggerDef';
import * as OpenApiValidator from 'express-openapi-validator';
import fs from 'fs';

const app: Application  = express();


// SWAGGER
fs.writeFile('openapi.json', JSON.stringify(openapiSpecification), (err) => {});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))

app.use(cors());
app.use(express.json());

// OPENAPI VALIDATION
app.use(
  OpenApiValidator.middleware({
      // @ts-ignore
    apiSpec: openapiSpecification,
    validateRequests: true, // (default)
    // validateResponses: true, // false by default
  }),
);

app.use(morgan('dev'));
app.use(router);

export default app;