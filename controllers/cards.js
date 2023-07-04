const Card = require('../models/card');
const NotFoundError = require('../errors/notFoundError');

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send(card);
    })
    .catch((error) => console.log(error));
};

const findCards = (res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((error) => console.log(error));
};

const deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемые данные по указанному id не найдены');
    })
    .then((cardForDeleting) => {
      res.send(cardForDeleting);
    })
    .catch((error) => console.log(error));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Запрашиваемые данные по указанному id не найдены');
    })
    .then((card) => {
      res.send(card);
    })
    .catch((error) => console.log(error));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Запрашиваемые данные по указанному id не найдены');
    })
    .then((card) => {
      res.send(card);
    })
    .catch((error) => console.log(error));
};

module.exports = {
  createCard,
  findCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
