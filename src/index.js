const express = require('express');
const dotenv = require('dotenv');
const { healthRouter, categoryRouter } = require('./routes');

const app = express();
dotenv.config();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use('/health', healthRouter);
app.use('/category', categoryRouter);

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
});
