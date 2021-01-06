const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUserId, getUser,
} = require('../controllers/users');

router.get('/users', getUser);
router.get('/users/:userId', celebrate({
  body: Joi.object().keys({
    id: Joi.string().hex(),
  }),
}), getUserId);

module.exports = router;
