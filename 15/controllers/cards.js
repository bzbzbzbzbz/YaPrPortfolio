const Card = require('../models/card');
const Forbidden = require('../errors/forbidden');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.addCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then((card) => res.status(201).send({ data: card }))
    .catch(next);
};

module.exports.removeCard = (req, res, next) => {
  const cardOwner = req.user._id;
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (cardOwner !== card.owner.toString()) {
        throw new Forbidden('Нет прав');
      }
      res.send({ data: card });
    })
    .catch(next);
};
