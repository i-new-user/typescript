"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTER_PATH = exports.port = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const blogs_routers_1 = require("./routers/blogs_routers");
const posts_routers_1 = require("./routers/posts_routers");
const testing_routers_1 = require("./routers/testing_routers");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
exports.app = (0, express_1.default)();
exports.port = 3001;
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
exports.app.get('/', (req, res) => {
    console.log(exports.ROUTER_PATH.test);
    res.send('Hello World!');
});
exports.app.listen(exports.port, () => {
    console.log(`Example app listening on port ${exports.port}`);
});
