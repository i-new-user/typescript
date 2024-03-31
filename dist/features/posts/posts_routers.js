"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const statuses_1 = require("../../http/statuses");
const posts_service_1 = require("../../domains/posts_service");
const query_repository_1 = require("../../repositories/posts/query_repository");
const query_repositories_1 = require("../../repositories/blogs/query_repositories");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const basic_auth_1 = require("../../middleware/basic_auth");
const input_validator_1 = require("../../middleware/input_validator");
const blog_custom_valid_1 = require("../../middleware/blog_custom_valid");
const posts_validator_1 = require("../../middleware/posts_validator");
exports.postsRouter = (0, express_1.Router)({});
exports.postsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const sortBy = (_a = req.query.sortBy) !== null && _a !== void 0 ? _a : "createdAt";
    const sortDirection = req.query.sortDirection === undefined ? 'desc' : 'asc';
    const pageNumber = (_b = req.query.pageNumber) !== null && _b !== void 0 ? _b : '1';
    const pageSize = (_c = req.query.pageSize) !== null && _c !== void 0 ? _c : '10';
    const posts = yield query_repository_1.postQueryRepository.findPosts(sortBy, sortDirection, pageNumber, pageSize);
    res.send(posts);
}))
    .get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield query_repository_1.postQueryRepository.findPostById(req.params.id);
    if (post) {
        res.send(post);
    }
    else {
        res.sendStatus(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
}))
    .post('/', basic_auth_1.basicAuth, posts_validator_1.titleValid, posts_validator_1.shortDescriptionValid, posts_validator_1.contentValid, posts_validator_1.blogIdValid, blog_custom_valid_1.isBlogCustomValid, input_validator_1.inputValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, shortDescription, content, blogId } = req.body;
    const blog = yield query_repositories_1.blogsQueryRepository.findBlogById(blogId);
    if (!blog) {
        return res.sendStatus(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
    const newPost = yield posts_service_1.postService.createPost(title, shortDescription, content, blogId, blog.name);
    res.status(statuses_1.HTTP_STATUSES.CREATED_201).send(newPost);
}))
    .put('/:id', basic_auth_1.basicAuth, posts_validator_1.titleValid, posts_validator_1.shortDescriptionValid, posts_validator_1.contentValid, posts_validator_1.blogIdValid, blog_custom_valid_1.isBlogCustomValid, input_validator_1.inputValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, shortDescription, content, blogId } = req.body;
    const idUpdate = yield posts_service_1.postService.updatePost(req.params.id, title, shortDescription, content, blogId);
    if (idUpdate) {
        res.sendStatus(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
    }
    else {
        res.sendStatus(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
}))
    .delete('/:id', basic_auth_1.basicAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield posts_service_1.postService.deletePost(req.params.id);
    if (isDeleted) {
        res.sendStatus(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
    }
    else {
        res.sendStatus(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
}))
    .get('/:id/comments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    const id = req.params.id;
    const post = yield query_repository_1.postQueryRepository.findPostById(id);
    if (!post) {
        return res.sendStatus(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
    const sortBy = (_d = req.query.sortBy) !== null && _d !== void 0 ? _d : "createdAt";
    const sortDirection = req.query.sortDirection === 'desc' ? -1 : 1;
    const pageNumber = (_e = req.query.pageNumber) !== null && _e !== void 0 ? _e : '1';
    const pageSize = (_f = req.query.pageSize) !== null && _f !== void 0 ? _f : '10';
    const comments = yield query_repository_1.postQueryRepository.findPostByIdComments(id, sortBy, sortDirection, pageNumber, pageSize);
    if (comments) {
        res.send(comments);
    }
    else {
        res.sendStatus(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
}))
    .post('/:id/comments', posts_validator_1.contentValid, authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content } = req.body;
    const comment = yield posts_service_1.postService.createCommentByPostId(content, req.user);
    res.status(statuses_1.HTTP_STATUSES.CREATED_201).send(comment);
}));
