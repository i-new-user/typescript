"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testBlogsRouter = void 0;
const express_1 = require("express");
const blogs_repositoty_1 = require("../repositories/blogs_repositoty");
const http_statuses_1 = require("../HTTP/http_statuses");
const unauthorized_middlevare_1 = require("../middleware/unauthorized_middlevare");
exports.testBlogsRouter = (0, express_1.Router)({});
exports.testBlogsRouter.delete('/testing/all-data', unauthorized_middlevare_1.unauthorized_middleware, (req, res) => {
    blogs_repositoty_1.blogsRepository.deleteAllBlogsRouter();
    res.sendStatus(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
});
