require('dotenv').config();
const express = require('express');
const connection = require('./Config');
const PORT = process.env.PORT || 8000;
const app = express();

const homeRouter = require('./routes/home');
const productsRouter = require('./routes/products');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/home', homeRouter);
app.use('/products', productsRouter);

// app.get('/products', (req, res) => {
//   connection.query('SELECT * FROM products', (err, results) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Error retrieving products from db.');
//     } else {
//       res.json(results);
//     }
//   });
// });

app.get('/products', (req, res) => {
  connection
    .promise()
    .query('SELECT * FROM products')
    .then(([results]) => {
      res.json(results);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving products from db.');
    });
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  connection
    .promise()
    .query('SELECT * FROM products WHERE id = ?', [id])
    .then(([results]) => {
      if (results.length) {
        res.json(results[0]);
      } else {
        res.sendStatus(404);
      }
    });
});

app.delete('/products/:id', (req, res) => {
  connection
    .promise()
    .query('DELETE FROM products WHERE id = ?', [req.params.id])
    .then(([result]) => {
      if (result.affectedRows) res.sendStatus(204);
      else res.sendStatus(404);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

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
