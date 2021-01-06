const router = require('express').Router();
const path = require('path');
const fs = require('fs').promises;

const cards = path.join(__dirname, '../data/cards.json');

const sendCards = (req, res) => {
  fs.readFile(cards, { encoding: 'utf8' })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({ err });
    });
};

router.get('/', sendCards);

module.exports = router;
