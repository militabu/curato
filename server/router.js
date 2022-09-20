const Router = require('koa-router');
const controllers = require('./controllers/controllers');

const router = Router();

router.get('/user', (ctx) => controllers.getUser(ctx));

router.post('/user', (ctx) => controllers.postUser(ctx));

module.exports = router;