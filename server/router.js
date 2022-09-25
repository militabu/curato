const Router = require('koa-router');
const controllers = require('./controllers/controllers');

const router = Router();


// The following is daft. I want to get the user, but I don't want their ID in the url,
// so I have to use a post request to call a get function...
// router.get('/user', (ctx) => controllers.getUser(ctx));
router.post('/user', (ctx) => controllers.getUser(ctx));

// We may need an additional function to get extra shared albums from other users...
// router.get('/albums', (ctx) => controllers.getAlbums(ctx));

// The user stores all of the albums, so we can fetch them all at the same time, but to update specific albums let's have a route.
router.post('/albums', (ctx) => controllers.postAlbum(ctx));

router.get('/userlist', (ctx) => controllers.getAllUsers(ctx))

router.get('/delete', (ctx) => controllers.deleteAlbums(ctx));

module.exports = router;