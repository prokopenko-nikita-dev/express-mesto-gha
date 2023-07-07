const express = require('express');

const router = express.Router();

const {
  createUser,
  getUsers,
  findUserById,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', createUser);
router.post('/', createUser);
router.get('/me', getUsers);
router.get('/:userId', findUserById);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
