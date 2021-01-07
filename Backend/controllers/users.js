const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUser = (req, res, next) => {
  const userId = req.user;

  User.findById(userId)
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then(() => res.status(201).send({
      data: {
        name, email,
      },
    }))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const {
    email, password,
  } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.cookie('jwt', token, { httpOnly: true, sameSite: true }).status(200).send({ message: 'Вход выполнен' });
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt').end();
};
