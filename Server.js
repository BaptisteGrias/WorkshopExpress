require('dotenv').config();
const express = require('express');
const connection = require('./Config');
const PORT = process.env.PORT || 8000;
const app = express();

const homeRouter = require('./routes/home');
const productsRouter = require('./routes/products');

app.use('/home', homeRouter);
app.use('/products', productsRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connection.connect((err) => {
  if (err) {
    console.error('error connecting to db');
  } else {
    console.log('connected to db');
  }
});

app.listen(PORT, () => {
  console.log('server:' + PORT);
});
