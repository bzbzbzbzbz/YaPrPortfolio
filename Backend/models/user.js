const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Unauthorized = require('../errors/unauthorized');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isEmail(link);
      },
      message: 'Некорректный Email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized('Пользователь не найден'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Unauthorized('Пользователь не найден'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
