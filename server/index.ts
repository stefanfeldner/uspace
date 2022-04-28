require('dotenv').config();

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const router = require('./router');
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger('dev'));
app.use(router);

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT} 🚀`));

// const testfunction = (input: string): string => {
//   return 0;
// }