const { User } = require('../models/schema');

const getUser = async (ctx) => {
  try {
    const id = ctx.request.body.id
    ctx.body = await User.findOne({ _id: id}).exec();
    ctx.status = 200;
  } catch (err) {
    console.log('ERROR: ', err);
    ctx.status = 400;
  }
}

const postUser = (ctx) => {
  try {
    const user = ctx.request.body;
    console.log('Creating new user:', user);
    const newUser = new User(user);
    newUser.save();
    console.log('Inserted _id is ', newUser._id.toString());
    ctx.status = 201;
  } catch (err) {
    console.log('ERROR: ', err);
    ctx.status = 400;
  }
}


module.exports = { getUser, postUser };