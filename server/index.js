require('dotenv').config();

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const router = require('./router');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const PORT = process.env.PORT;
const app = express();

// SWAGGER
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'uspace API docs',
      version: '1.0.0',
    }
  },
  apis: ['./router.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use(cors());
app.use(express.json());
app.use(logger('dev'));
app.use(router);

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT} 🚀`)
);