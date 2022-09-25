const { ObjectId } = require("mongodb");
const { User, Album } = require("../models/schema");

const getUser = async (ctx) => {
  try {
    const id = ctx.request.body.id;
    console.log('Getting user: ', id);
    let user = await User.findOne({ _id: id });
    ctx.body = user;
    ctx.status = 200;
  } catch (err) {
    console.log("ERROR: ", err);
    ctx.status = 400;
  }
};

const postUser = (ctx) => {
  try {
    const user = ctx.request.body;
    console.log("Creating new user:", user);
    const newUser = new User(user);
    newUser.save();
    console.log("Inserted _id is ", newUser._id.toString());
    ctx.status = 201;
  } catch (err) {
    console.log("ERROR: ", err);
    ctx.status = 400;
  }
};

const postAlbum = async (ctx) => {
  try {
    const userId = ctx.request.body.userId;
    const album = ctx.request.body.album;

    console.log("The album received is: ", album);

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
      // const newAlbum = new Album(album);
      // TODO: Improve the following janky logic:
      
      const existingAlbum = await User.findOneAndUpdate(
        { "_id": userId, "albums._id": album.id },
        { 
            "$set": {
                "albums.$": album
            }
        },
        { new: true }
      );
      console.log("Searching for existing album, found: ", existingAlbum);
      ctx.status = 200;
    }
  } catch (err) {
    console.log("Error in server postAlbum: ", err);
  }
};

const getAllUsers = async (ctx) => {
  try {
    const userList = await User.find();
    ctx.body = userList.map((user) => {
      return {
        _id: user._id,
        userName: user.userName,
        userImg: user.userImg,
        contacts: user.contacts,
      };
    });
    ctx.status = 200;
  } catch (err) {
    console.log("Error in the server getAllUsers: ", err);
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

module.exports = { getUser, postUser, postAlbum, deleteAlbums, getAllUsers };
