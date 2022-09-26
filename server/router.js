const Router = require('koa-router');
const { getUser, getAllUsers, postUserList, deleteUser, postUser, deleteContacts } = require('./controllers/user.controller');
const { postAlbum, deleteAlbums } = require('./controllers/album.controller');

const router = Router();

router.post('/user', (ctx) => getUser(ctx));
router.post('/new-user', (ctx) => postUser(ctx));
router.post('/update-user', (ctx) => postUserList(ctx));
router.get('/userlist', (ctx) => getAllUsers(ctx));
router.post('/delete-user', (ctx) => deleteUser(ctx));

router.post('/delete-contacts', (ctx) => deleteContacts(ctx));

// We may need an additional function to get extra shared albums from other users...
router.get('/shared-albums', (ctx) => getSharedAlbums(ctx));

// The user stores all of the albums, so we can fetch them all at the same time, but to update specific albums let's have a route.
router.post('/albums', (ctx) => postAlbum(ctx));

router.get('/delete', (ctx) => deleteAlbums(ctx));

module.exports = router;