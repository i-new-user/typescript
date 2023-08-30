"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const express_1 = require("express");
const blogs_repositoriy_1 = require("../repositories/blogs_repositoriy");
const posts_repositoriy_1 = require("./../repositories/posts_repositoriy");
const statuses_1 = require("../http/statuses");
exports.testingRouter = (0, express_1.Router)({});
exports.testingRouter.delete('/', (req, res) => {
    blogs_repositoriy_1.blogsRepository.deleteAllBlogs();
    posts_repositoriy_1.postsRepository.deleteAllPost();
    res.sendStatus(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
});
