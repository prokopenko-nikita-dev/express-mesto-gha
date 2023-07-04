const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlenght: 30
  },
  about: {
    type: String,
    minlength: 2,
    maxlenght: 30
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'
  }
})

const User = mongoose.model('user', userSchema);

module.exports = User;