const express = require('express');
const connection = require('../Config');
const router = express.Router();

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

module.exports = router;
