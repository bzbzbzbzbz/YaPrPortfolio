const router = require('express').Router();
const path = require('path');
const fs = require('fs').promises;

const users = path.join(__dirname, '../data/users.json');

const sendUsers = (req, res) => {
  fs.readFile(users, { encoding: 'utf8' })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({ err });
    });
};

const sendUserId = (req, res) => {
  fs.readFile(users, { encoding: 'utf8' })
    .then((data) => {
      if (!JSON.parse(data).find((item) => item._id === req.params.id)) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      } else {
        res.json(JSON.parse(data).find((item) => item._id === req.params.id));
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

router.get('/', sendUsers);
router.get('/:id', sendUserId);

module.exports = router;
