const express = require('express');
const connection = require('../Config');
const router = express.Router();

router.get('/', (req, res) => {
  const sql = `SELECT * FROM products`;

  connection.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ errorMessage: err });
    } else if (result.length === 0) {
      res.status(422).json({ errorMessage: 'No products' });
    } else {
      res.status(200).json(result);
    }
  });
});

module.exports = router;
