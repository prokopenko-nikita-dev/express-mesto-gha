const User = require('../models/user.js');
const NotFoundError = require('../errors/notFoundError');

const createUser = (req, res) => {

  const { name, about, email } = req.body;

  User.create({ name, about, email })
    .then((user) => {
      res.send(user)
    })
    .catch((error) => {
      res.status(400).send(error);
    })
}

const getUsers = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемые данные по указанному id не найдены');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      customError(err, req, res, next);
    });
};

const findUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемые данные по указанному id не найдены');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      customError(err, req, res, next);
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new NotFoundError('Запрашиваемые данные по указанному id не найдены');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      customError(err, req, res, next);
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new NotFoundError('Запрашиваемые данные по указанному id не найдены');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      customError(err, req, res, next);
    });
};

module.exports = {
  createUser,
  getUsers,
  findUserById,
  updateUserInfo,
  updateUserAvatar
}