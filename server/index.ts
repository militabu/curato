import Koa from 'koa';
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import { router } from './router'

const HOSTNAME = 'localhost';
const PORT = 3210;

export const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(router.routes());

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server listening at ${HOSTNAME}:${PORT}`);
});
