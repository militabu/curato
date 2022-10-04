"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Album = void 0;
const db_1 = __importDefault(require("../db"));
const albumSchema = new db_1.default.Schema({
    id: String,
    title: String,
    date: Number,
    description: String,
    favorite: Boolean,
    coverImg: String,
    sharedWith: [String],
    images: { type: [String], default: [] }
});
exports.Album = db_1.default.model('Album', albumSchema);
const userSchema = new db_1.default.Schema({
    userName: String,
    userImg: String,
    contacts: { type: [String], default: [] },
    friendsAlbums: [{ userId: String, albumId: String }],
    albums: { type: [albumSchema], default: [] }
});
exports.User = db_1.default.model('User', userSchema);
