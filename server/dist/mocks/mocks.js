"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockAlbum = exports.mockUser = void 0;
exports.mockUser = {
    id: '',
    userName: "testUser",
    userImg: "localhost://testUser.com",
    contacts: ["user2345678"],
    friendsAlbums: [
        {
            userId: "user111111",
            albumId: "album111111"
        }
    ],
    albums: [
        {
            id: "633703c4a9baea65b9af6677",
            title: "testAlbum",
            date: Date.now(),
            description: "test album",
            favorite: true,
            coverImg: "localhost://testAlbum.com",
            sharedWith: ["111122223333"],
            images: ["localhost://testImage.com"],
        }
    ]
};
exports.mockAlbum = {
    id: "633703c4a9baea65b9af6688",
    title: "testAlbum2",
    date: Date.now(),
    description: "test album",
    favorite: true,
    coverImg: "localhost://testAlbum.com",
    sharedWith: ["111122223333"],
    images: ["localhost://testImage.com"],
};
