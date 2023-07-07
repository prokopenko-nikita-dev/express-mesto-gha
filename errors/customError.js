const BadRequestError = require('./badRequestError');
const NotFoundError = require('./notFoundError');

module.exports.customError = (err, next) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    return next(new BadRequestError('Переданы некорректные данные для данной операции'));
  }
  if (err.name === 'DocumentNotFoundError') {
    return next(new NotFoundError('Запрашиваемые данные по указанному id не найдены'));
  }
  return next(err);
};
