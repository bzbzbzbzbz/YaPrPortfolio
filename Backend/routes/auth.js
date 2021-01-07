const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  login, logout, createUser,
} = require('../controllers/users');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(/^([\w-]\.?)+@([\w-]+\.)+[\w-]+/),
    password: Joi.string().min(8).pattern(/\S+/),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(/^([\w-]\.?)+@([\w-]+\.)+[\w-]+/),
    password: Joi.string().min(6).pattern(/\S+/),
  }),
}), login);
router.post('/logout', logout);

module.exports = router;
