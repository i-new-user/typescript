"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testPostsRouter = void 0;
const express_1 = require("express");
const unauthorized_middlevare_1 = require("../middleware/unauthorized_middlevare");
const posts_repository_1 = require("../repositories/posts_repository");
const blogs_repositoty_1 = require("../repositories/blogs_repositoty");
const http_statuses_1 = require("../HTTP/http_statuses");
exports.testPostsRouter = (0, express_1.Router)({});
testRouter.delete('/testing/all-data', unauthorized_middlevare_1.unauthorized_middleware, (req, res) => {
    posts_repository_1.postsRepository.deleteAllPostsRouter();
    blogs_repositoty_1.blogsRepository.deleteAllBlogsRouter();
    res.sendStatus(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
});
