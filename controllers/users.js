const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const { customError } = require('../errors/customError');

const createUser = (req, res) => {
  const { name, about, email } = req.body;
  User.create({ name, about, email })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      customError(err, req, res);
    });
};

const getUsers = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемые данные по указанному id не найдены');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      customError(err, req, res);
    });
};

const findUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемые данные по указанному id не найдены');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      customError(err, req, res);
    });
};

const updateUserInfo = (req, res) => {
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
      customError(err, req, res);
    });
};

const updateUserAvatar = (req, res) => {
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
      customError(err, req, res);
    });
};

module.exports = {
  createUser,
  getUsers,
  findUserById,
  updateUserInfo,
  updateUserAvatar,
};
