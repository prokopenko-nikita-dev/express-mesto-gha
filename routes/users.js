const express = require('express');

const router = express.Router();

const {
  createUser,
  getUsers,
  findUserById,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/users', createUser);
router.post('/users', createUser);
router.get('/users/me', getUsers);
router.get('/users/:userId', findUserById);
router.patch('/users/me', updateUserInfo);
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
