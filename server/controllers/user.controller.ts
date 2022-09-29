const { User } = require("../models/schema");
const { ObjectId } = require('mongodb');

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

const postUserList = async (ctx) => {
  try {
    const newUser = ctx.request.body;
    const user = await User.findOne({ _id:newUser._id });
    user['contacts'] = newUser.contacts;
    user.save();
    ctx.status = 201;
  } catch (err) {
    console.log('Error in the server postUserList: ', err);
  }
}

const deleteContacts = async (ctx) => {
  try {
    const userId = ctx.request.body.id;
    const user = await User.findOne({ '_id': ObjectId(userId) });
    user.contacts = [];
    console.log('Found the following user: ', user);
    user.save();
    ctx.status = 204;
  } catch (err) {
    console.log('Error in the server deleteContacts: ', err);
  }
}

const deleteUser = (ctx) => {
  try {
    const userId = ctx.request.body.id;
    console.log('User ID to delete is: ', userId);
    User.findOneAndDelete({ "_id": ObjectId(userId) }, function(err, docs) {
      if (err) {
        console.log('Error in delete: ', err);
      } else {
        console.log('Deleted user: ', docs);
      }
    });
    ctx.status = 204;
  } catch (err) {
    console.log('Error in the server deleteUser: ', err);
  }
}

module.exports = { getUser, postUser, postUserList, getAllUsers, deleteUser, deleteContacts };
