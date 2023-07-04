const Card = require('../models/card');
const NotFoundError = require('../errors/notFoundError');

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(CREATED).send(card);
    })
    .catch((err) => {
      customError(err, req, res, next);
    });
};

const findCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch((err) => {
      customError(err, req, res, next);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемые данные по указанному id не найдены');
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Удаляемая запись принадлежит другому пользователю');
      }
      Card.findByIdAndRemove(req.params.cardId)
        .orFail(() => {
          throw new NotFoundError('Запрашиваемые данные по указанному id не найдены');
        })
        .then((cardForDeleting) => {
          res.send(cardForDeleting);
        })
        .catch((err) => {
          customError(err, req, res, next);
        });
    })
    .catch((err) => {
      customError(err, req, res, next);
    });
};

const likeCard = (req, res, next) => {
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
    .catch((err) => {
      customError(err, req, res, next);
    });
};

const dislikeCard = (req, res, next) => {
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
    .catch((err) => {
      customError(err, req, res, next);
    });
};



module.exports.createCard = (req, res) => {
  console.log(req.user._id);
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)

module.exports = {
  createCard,
  findCards,
  deleteCard,
  likeCard,
  dislikeCard
};