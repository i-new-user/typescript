"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRouter = void 0;
const express_1 = require("express");
const posts_repository_1 = require("../repositories/posts_repository");
const blogs_repositoty_1 = require("../repositories/blogs_repositoty");
const http_statuses_1 = require("../HTTP/http_statuses");
exports.deleteRouter = (0, express_1.Router)({});
testRouter.delete('testing/all-data', (req, res) => {
    posts_repository_1.postsRepository.deleteRouter();
    blogs_repositoty_1.blogsRepository.deleteAllBlogsRouter();
    res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
});
