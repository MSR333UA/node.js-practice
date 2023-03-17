const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const {connectMongo} = require('./src/db/connections');
const {errorHandler} = require('./src/helpers/apiHelpers');
const {authRouter} = require('./src/routers/authRouter');
const {postRouter} = require('./src/routers/postsRouter');

// const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(morgan('tiny'));
// app.use(cors());
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);

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
