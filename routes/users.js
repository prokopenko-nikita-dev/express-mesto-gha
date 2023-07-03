const router = require('express').Router();

const {
  createUser,
  getUsers,
  findUserById,
  updateUserInfo,
  updateUserAvatar
} = require('../controllers/users.js');


router.get('/', createUser);
router.get('/me', getUsers);
router.get('/:userId', findUserById);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;