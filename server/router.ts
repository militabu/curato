import Router from 'koa-router';
import { getUser, getAllUsers, postUserList, deleteUser, postUser, deleteContacts } from './controllers/user.controller';
import { postAlbum, deleteAlbums, getSharedAlbums } from './controllers/album.controller';

export const router = new Router();

router.post('/user', (ctx) => getUser(ctx));
router.post('/new-user', (ctx) => postUser(ctx));
router.post('/update-user', (ctx) => postUserList(ctx));
router.get('/userlist', (ctx) => getAllUsers(ctx));
router.delete('/delete-user', (ctx) => deleteUser(ctx));

router.delete('/delete-contacts', (ctx) => deleteContacts(ctx));

// We may need an additional function to get extra shared albums from other users...
// router.get('/shared-albums', (ctx) => getSharedAlbums(ctx));

// The user stores all of the albums, so we can fetch them all at the same time, but to update specific albums let's have a route.
router.post('/albums', (ctx) => postAlbum(ctx));

router.delete('/delete', (ctx) => deleteAlbums(ctx));

