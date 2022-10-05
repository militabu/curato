"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const user_controller_1 = require("./controllers/user.controller");
const album_controller_1 = require("./controllers/album.controller");
exports.router = new koa_router_1.default();
exports.router.post('/user', (ctx) => (0, user_controller_1.getUser)(ctx));
exports.router.post('/new-user', (ctx) => (0, user_controller_1.postUser)(ctx));
exports.router.put('/update-user', (ctx) => (0, user_controller_1.postUserList)(ctx));
exports.router.get('/userlist', (ctx) => (0, user_controller_1.getAllUsers)(ctx));
exports.router.delete('/delete-user', (ctx) => (0, user_controller_1.deleteUser)(ctx));
exports.router.delete('/delete-contacts', (ctx) => (0, user_controller_1.deleteContacts)(ctx));
// We may need an additional function to get extra shared albums from other users...
// router.get('/shared-albums', (ctx) => getSharedAlbums(ctx));
// The user stores all of the albums, so we can fetch them all at the same time, but to update specific albums let's have a route.
exports.router.post('/albums', (ctx) => (0, album_controller_1.postAlbum)(ctx));
exports.router.delete('/delete', (ctx) => (0, album_controller_1.deleteAlbums)(ctx));
