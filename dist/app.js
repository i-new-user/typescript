"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTER_PATH = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const blogs_routers_1 = require("./features/blogs/blogs_routers");
const posts_routers_1 = require("./features/posts/posts_routers");
const users_router_1 = require("./features/users/users_router");
const auth_router_1 = require("./features/auth/auth_router");
const testing_routers_1 = require("./features/testing_routers");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(body_parser_1.default.json());
exports.ROUTER_PATH = {
    blogs: '/blogs',
    posts: '/posts',
    users: '/users',
    login: '/auth/login',
    test: '/testing/all-data'
};
exports.app.use(exports.ROUTER_PATH.blogs, blogs_routers_1.blogsRouter);
exports.app.use(exports.ROUTER_PATH.posts, posts_routers_1.postsRouter);
exports.app.use(exports.ROUTER_PATH.users, users_router_1.usersRouter);
exports.app.use(exports.ROUTER_PATH.login, auth_router_1.authRouter);
exports.app.use(exports.ROUTER_PATH.test, testing_routers_1.testingRouter);
exports.app.get('/', (req, res) => {
    res.send('Hello World!');
});
