require('dotenv').config();

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const router = require('./routes/router');
const OpenApiValidator = require('express-openapi-validator');

const swaggerUi = require('swagger-ui-express');
const openapiSpecification = require('./docs/swaggerDef');

const fs = require('fs');
const PORT = process.env.PORT;

const app = express();
// SWAGGER
fs.writeFile('openapi.json', JSON.stringify(openapiSpecification), (err) => {});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use(cors());
app.use(express.json());

// OPENAPI VALIDATION
app.use(
  OpenApiValidator.middleware({
    apiSpec: openapiSpecification,
    validateRequests: true, // (default)
    // validateResponses: true, // false by default
  }),
);
app.use(logger('dev'));
app.use(router);

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT} 🚀`)
);