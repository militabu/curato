import { User }  from "../models/schema";
import { ObjectId } from 'mongodb';
import { Context } from "koa";
import { Document, Error } from "mongoose";

export const getUser = async (ctx:Context) => {
  try {
    const id = ctx.request.body?.id;
    if(!id) throw new Error('User id is not provided')

    console.log('Getting user: ', id);
    let user = await User.findOne({ _id: new ObjectId(id.toString()) });
    // add this condition to prevent user === undefined
    if(!user || Object.keys(user).length === 0 ) throw new Error('User data is not provided')

    ctx.body = user;
    ctx.status = 200;

  } catch (err) {
    console.log("ERROR: ", err);
    ctx.status = 400;
  }
};

export const postUser = (ctx:Context) => {
  try {
    const user = ctx.request.body;

    if(!user || Object.keys(user).length === 0 ) throw new Error('User data is not provided')

    const newUser = new User(user);
    newUser.save();
    console.log("Inserted _id is ", newUser._id.toString());
    ctx.body = newUser;
    ctx.status = 201;

  } catch (err) {
    console.log("ERROR: ", err);
    ctx.status = 400;
  }
};

export const getAllUsers = async (ctx:Context) => {
  try {
    const userList = await User.find();
    // add this condition to prevent user === undefined
    if(!userList || Object.keys(userList).length === 0 ) throw new Error('User data is not provided')

    if(userList) {
      ctx.body = userList.map((user) => {
        return {
          _id: user._id,
          userName: user.userName,
          userImg: user.userImg,
          contacts: user.contacts,
        };
      });
      ctx.status = 200;
    } else {
      throw new Error('user list not found')
    }
  } catch (err) {
    console.log("Error in the server getAllUsers: ", err);
    ctx.status = 400;
  }
};

export const postUserList = async (ctx:Context) => {
  try {
    const newUser = ctx.request.body;
    if(!newUser || Object.keys(newUser).length === 0) throw new Error('User id is not provided')
    
    const user = await User.findOne({ _id:newUser._id });
    // add this condition to prevent user === undefined
    if(!user || Object.keys(user).length === 0 ) throw new Error('No user found')
    
    user.contacts = newUser.contacts as string[];
    user.save();
    ctx.body = user;
    ctx.status = 201;

  } catch (err) {
    console.log('Error in the server postUserList: ', err);
    ctx.status = 400;
  }
}

export const deleteContacts = async (ctx:Context) => {
  try {
    const userId = ctx.request.body?.id;
    // what is ObjectId? 
    if(!userId) throw new Error('No user id provided')
    const user = await User.findOne({ _id: userId });
    // add this condition to prevent user === undefined
    if(!user || Object.keys(user).length === 0 ) throw new Error('No user found')
    
    user.contacts = [];
    console.log('Found the following user: ', user);
    user.save();
    ctx.status = 204;
  } catch (err) {
    console.log('Error in the server deleteContacts: ', err);
    ctx.status = 500;
  }
}

export const deleteUser = (ctx:Context) => {
  try {
    const userId = ctx.request.body?.id;
    console.log('delete userId',userId)

    if(!userId) throw new Error('No user id provided')
    console.log('User ID to delete is: ', userId);
    User.findOneAndDelete({ "_id": new ObjectId(userId.toString()) }, function(err:Error, docs:Document) {
      if (err || !docs) {
        console.log('Error in delete: ', err);
        ctx.status = 500
      } else {
        console.log('Deleted user: ', docs);
      }
    });
    ctx.status = 204;
  } catch (err) {
    console.log('Error in the server deleteUser: ', err);
    ctx.status = 500;
  }
}
