require('dotenv').config();

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const router = require('./routes/router');
const swaggerUi = require('swagger-ui-express');
const openapiSpecification = require('./docs/swaggerDef');

const PORT = process.env.PORT;
const app = express();

// SWAGGER
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use(cors());
app.use(express.json());
app.use(logger('dev'));
app.use(router);

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT} 🚀`)
);