const express = require('express');
const morgan = require('morgan');
const {connectMongo} = require('./src/db/connections');
const {errorHandler} = require('./src/helpers/apiHelpers');

const {routerRouter} = require('./src/routers/postsRouter');
require('dotenv').config();
// const cors = require("cors");
const app = express();

const PORT = 8081;

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
app.use(morgan('tiny'));
// app.use(cors());
app.use('/api/posts', routerRouter);
app.use(errorHandler);

const start = async () => {
  try {
    await connectMongo();

    app.listen(PORT, (err) => {
      if (err) console.error('error', err);
      console.log(`server works at port ${PORT}!`);
    });
  } catch (error) {
    console.error(`Failed to lunch application with error ${error.message}`);
  }
};

start();
