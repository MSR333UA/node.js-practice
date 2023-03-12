const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
// const cors = require("cors");

const app = express();

const {routerRouter} = require('./src/routers/postsRouter');

const PORT = process.env.PORT || 8083;
// const BASE_URL = "https://api.weatherbit.io/v2.0/current";

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
app.use(morgan('tiny'));
// app.use(cors());
app.use('/api/posts', routerRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.error('error', err);
  }
  console.log(`server works at port ${PORT}!`);
});

module.exports = app;
