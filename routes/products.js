const express = require('express');
const connection = require('../Config');
const router = express.Router();
const homeRouter = require('./routes/home');
const productsRouter = require('./routes/products');

router.use('/home', homeRouter);
router.use('/products', productsRouter);

router.get('/products', (req, res) => {
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

router.get('/products/:id', (req, res) => {
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

router.post('/', (req, res) => {
  const { name, price } = req.body;
  console.log(req.body);
  const sql = `INSERT INTO products(name, price) Values (?, ?)`;
  connection.query(sql, [name, price], (err, result) => {
    if (err) {
      res.status(500).json({ errorMessage: err });
    } else {
      res.status(200).json(result);
    }
  });
});

router.put('./id', (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const sql = `UPDATE products SET (?, ?) WHERE id=? `;
  connection.query(sql, [name, price, id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'error query database' });
    } else {
      res.status(200).json({ result: 'modification ok' });
    }
  });
});

router.delete('/products/:id', (req, res) => {
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

module.exports = router;
