const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.addCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректная ссылка' });
        return;
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.removeCard = (req, res) => {
  const cardOwner = req.user._id;
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      const owner = card.owner.toString();

      if (cardOwner !== owner) {
        res.status('403').send({ message: 'Нет прав' });
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный ID' });
      } else if (err.name === 'TypeError') {
        res.status(404).send({ message: 'Карточки с таким ID нет' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};
