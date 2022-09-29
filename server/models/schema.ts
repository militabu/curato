const mongoose = require('../db');

const albumSchema = new mongoose.Schema({
  title: String, 
  date: Number,
  description: String,
  favorite: Boolean,
  coverImg: String,
  sharedWith: [String],
  images: {type: [String], default: []}
})
const Album = mongoose.model('Album', albumSchema);

const userSchema = new mongoose.Schema({
  userName: String,
  userImg: String,
  contacts: {type: [String], default: []},
  friendsAlbums: [{ userId: String, albumId: String }],
  albums: { type: [albumSchema], default: [] }
});
const User = mongoose.model('User', userSchema);

module.exports = { User, Album };

