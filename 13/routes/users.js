const router = require('express').Router();

const {
  addUser, getUserId, getUser,
} = require('../controllers/users');

router.get('/users', getUser);
router.get('/users/:userId', getUserId);

router.post('/users', addUser);

module.exports = router;
