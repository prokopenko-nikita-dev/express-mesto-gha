const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const users = require('./routes/users');
const cards = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use('/users', users);
app.use('/cards', cards);

app.use((req) => {
  req.user = {
    _id: '64a3065b2a3e6673e24b4cb3',
  };
});

app.listen(3000, () => {
  console.log('Сервер запущен!');
});
