"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTER_PATH = exports.app = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const blogs_routers_1 = require("./features/blogs/blogs_routers");
const posts_routers_1 = require("./features/posts/posts_routers");
const testing_routers_1 = require("./features/testing_routers");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(body_parser_1.default.json());
exports.ROUTER_PATH = {
    blogs: '/blogs',
    posts: '/posts',
    test: '/testing/all-data'
};
exports.app.use(exports.ROUTER_PATH.blogs, blogs_routers_1.blogsRouter);
exports.app.use(exports.ROUTER_PATH.posts, posts_routers_1.postsRouter);
exports.app.use(exports.ROUTER_PATH.test, testing_routers_1.testingRouter);
// type objType = {
//   [key: string]: {id: number, name: string}
// }
// let obj: objType = {
//   '1': {id: 1, name: 'Tom'}, 
//   '100':  {id: 2, name: 'Ket'}, 
//   '1000':  {id: 3, name: 'Kruz'},
//   '5000':  {id: 4, name: 'Sem'}
// }
// let arr = [
//   {id: 1, name: 'Tom'}, 
//   {id: 2, name: 'Ket'}, 
//   {id: 3, name: 'Kruz'},
//   {id: 4, name: 'Sem'}
// ]
exports.app.get('/', (req, res) => {
    res.send('Hello World!');
});
