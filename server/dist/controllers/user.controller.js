"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.deleteContacts = exports.postUserList = exports.getAllUsers = exports.postUser = exports.getUser = void 0;
const schema_1 = require("../models/schema");
const mongodb_1 = require("mongodb");
const mongoose_1 = require("mongoose");
const getUser = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = ctx.request.body) === null || _a === void 0 ? void 0 : _a.id;
        if (!id)
            throw new mongoose_1.Error('User id is not provided');
        console.log('Getting user: ', id);
        const user = yield schema_1.User.findOne({ _id: new mongodb_1.ObjectId(id.toString()) });
        // add this condition to prevent user === undefined
        if (!user || Object.keys(user).length === 0)
            ctx.body = {};
        ctx.body = user;
        ctx.status = 200;
    }
    catch (err) {
        console.log("ERROR: ", err);
        ctx.status = 400;
    }
});
exports.getUser = getUser;
const postUser = (ctx) => {
    try {
        const user = ctx.request.body;
        if (!user || Object.keys(user).length === 0)
            throw new mongoose_1.Error('User data is not provided');
        const newUser = new schema_1.User(user);
        newUser.save();
        console.log("Inserted _id is ", newUser._id.toString());
        ctx.body = newUser;
        ctx.status = 201;
    }
    catch (err) {
        console.log("ERROR: ", err);
        ctx.status = 400;
    }
};
exports.postUser = postUser;
const getAllUsers = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userList = yield schema_1.User.find();
        // add this condition to prevent user === undefined
        // if(!userList || Object.keys(userList).length === 0 ) throw new Error('User data is not provided')
        if (userList) {
            ctx.body = userList.map((user) => {
                return {
                    _id: user._id,
                    userName: user.userName,
                    userImg: user.userImg,
                    contacts: user.contacts,
                };
            });
            ctx.status = 200;
        }
        else {
            throw new mongoose_1.Error('user list not found');
        }
    }
    catch (err) {
        console.log("Error in the server getAllUsers: ", err);
        ctx.status = 400;
    }
});
exports.getAllUsers = getAllUsers;
const postUserList = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = ctx.request.body;
        if (!newUser || Object.keys(newUser).length === 0)
            throw new mongoose_1.Error('User id is not provided');
        const user = yield schema_1.User.findOne({ _id: newUser._id });
        // add this condition to prevent user === undefined
        if (!user || Object.keys(user).length === 0)
            throw new mongoose_1.Error('No user found');
        user.contacts = newUser.contacts;
        user.save();
        ctx.body = user;
        ctx.status = 201;
    }
    catch (err) {
        console.log('Error in the server postUserList: ', err);
        ctx.status = 400;
    }
});
exports.postUserList = postUserList;
const deleteContacts = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const userId = (_b = ctx.request.body) === null || _b === void 0 ? void 0 : _b.id;
        // what is ObjectId? 
        if (!userId)
            throw new mongoose_1.Error('No user id provided');
        const user = yield schema_1.User.findOne({ _id: new mongodb_1.ObjectId(userId.toString()) });
        // add this condition to prevent user === undefined
        if (!user || Object.keys(user).length === 0)
            throw new mongoose_1.Error('No user found');
        user.contacts = [];
        console.log('Found the following user: ', user);
        user.save();
        ctx.status = 204;
    }
    catch (err) {
        console.log('Error in deleteContacts: ', err);
        ctx.status = 400;
    }
});
exports.deleteContacts = deleteContacts;
const deleteUser = (ctx) => {
    var _a;
    try {
        const userId = (_a = ctx.request.body) === null || _a === void 0 ? void 0 : _a.id;
        console.log('delete userId', userId);
        if (!userId)
            throw new mongoose_1.Error('No user id provided');
        console.log('User ID to delete is: ', userId);
        schema_1.User.findOneAndDelete({ "_id": new mongodb_1.ObjectId(userId.toString()) }, function (err, docs) {
            if (err || !docs) {
                console.log('Error in deleteUser: ', err);
                ctx.status = 400;
            }
            else {
                console.log('Deleted user: ', docs);
            }
        });
        ctx.status = 204;
    }
    catch (err) {
        console.log('Error in deleteUser: ', err);
        ctx.status = 400;
    }
};
exports.deleteUser = deleteUser;
