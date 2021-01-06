const router = require('express').Router();

const {
  getCards, addCard, removeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.post('/cards', addCard);

router.delete('/cards/:cardId', removeCard);

module.exports = router;
