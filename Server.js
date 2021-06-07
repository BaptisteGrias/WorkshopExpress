require('dotenv').config();
const express = require('express');
const connection = require('./Config');
const PORT = process.env.PORT || 8000;
const app = express();

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
