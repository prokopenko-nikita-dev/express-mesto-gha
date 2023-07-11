const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const users = require('./routes/users');
const cards = require('./routes/cards');
const signup = require('./routes/signup');
const signin = require('./routes/signin');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/notFoundError');

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/*', () => {
  throw new NotFoundError('Страница не найдена');
});

app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/signup', signup);
app.use('/signin', signin);

app.use(auth);

app.use(bodyParser.json());
app.use('/users', users);
app.use('/cards', cards);

app.use((req, res, next) => {
  req.user = {
    _id: '64a3065b2a3e6673e24b4cb3',
  };
  next();
});

app.listen(3000, () => {
  console.log('Сервер запущен!');
});
