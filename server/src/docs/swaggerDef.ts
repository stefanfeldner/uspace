import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'uspace API docs',
      version: '1.0.0',
    },
  },
  apis: ['./docs/*.yml', './routes/router.js'],
};

export default swaggerJsdoc(options);