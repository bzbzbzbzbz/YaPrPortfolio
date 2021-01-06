const router = require('express').Router();

const {
  getUserId, getUser,
} = require('../controllers/users');

router.get('/users', getUser);
router.get('/users/:userId', getUserId);

module.exports = router;
