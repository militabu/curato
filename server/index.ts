const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const router = require('./router');

const HOSTNAME = 'localhost';
const PORT = 3210;

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(router.routes());

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server listening at ${HOSTNAME}:${PORT}`);
});
