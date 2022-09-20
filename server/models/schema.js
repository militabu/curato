const mongoose = require('../db');

const userSchema = new mongoose.Schema({
  userName: String,
  userImg: String,
  contacts: {type: Array, default: []},
  albums: {type: Array, default: []}
});
const User = mongoose.model('User', userSchema);

const albumSchema = new mongoose.Schema({
  title: String, 
  description: String,
  imgList: {type: Array, default: []}
})
const Album = mongoose.model('Album', albumSchema);

module.exports = { User, Album };

