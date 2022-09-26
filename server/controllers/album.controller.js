const { User, Album } = require("../models/schema");

const postAlbum = async (ctx) => {
  try {
    const userId = ctx.request.body.userId;
    const album = ctx.request.body.album;

    // console.log("The album received is: ", album);

    // Either create the album on the user or update it if it already exists.
    // Existing albums will have a populated MongoDB ID.
    if (album.id === '') {
      const user = await User.findOne({ _id: userId });
      const newAlbum = new Album(album);
      user.albums.push(newAlbum);
      user.save();
      ctx.body=newAlbum._id;
      ctx.status=201;
    } else {      
      const user = await User.findOne({ "_id": userId });
      user.albums.forEach((el, index) => {
          if (album.id = el._id) {
            user.albums[index] = { ...album, _id: album.id }
          }
          console.log("Searching for existing album, found: ", user.albums[index]);
        }
      )
      user.save();
      ctx.status = 200;
    }
  } catch (err) {
    console.log("Error in server postAlbum: ", err);
  }
};

const deleteAlbums = async (ctx) => {
  try {
    const userId = ctx.request.body.userId;
    const user = await User.findOneAndUpdate({ _id: userId });
    user.albums = [];
    user.save();
    ctx.status = 204;
    console.log(`User ${userId} albums removed`);
  } catch (err) {
    console.log("Error in the server deleteAlbum: ", err);
  }
}

module.exports = { postAlbum, deleteAlbums };
