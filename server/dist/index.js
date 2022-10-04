"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const koa_1 = __importDefault(require("koa"));
const cors_1 = __importDefault(require("@koa/cors"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const router_1 = require("./router");
const HOSTNAME = 'localhost';
const PORT = 3210;
exports.app = new koa_1.default();
exports.app.use((0, cors_1.default)());
exports.app.use((0, koa_bodyparser_1.default)());
exports.app.use(router_1.router.routes());
exports.app.listen(PORT, HOSTNAME, () => {
    console.log(`Server listening at ${HOSTNAME}:${PORT}`);
});
