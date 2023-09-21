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
const posts_service_1 = require("../../domain/posts_service");
const query_repositories_1 = require("../../repositories/blogs/query_repositories");
const query_repositories_2 = require("../../repositories/posts/query_repositories");
const basic_auth_1 = require("../../middleware/basic_auth");
const input_validator_1 = require("../../middleware/input_validator");
const blog_custom_validator_1 = require("../../middleware/blog_custom_validator");
const posts_validators_1 = require("../../middleware/posts_validators");
exports.postsRouter = (0, express_1.Router)({});
exports.postsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let posts = yield query_repositories_2.postQueryRepository.findPosts();
    res.send(posts);
}))
    .get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let post = yield query_repositories_2.postQueryRepository.findPostById(req.params.id);
    if (post) {
        res.send(post);
    }
    else {
        res.sendStatus(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
}))
    .delete('/:id', basic_auth_1.basicAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isDeleted = yield posts_service_1.postsService.deletePost(req.params.id);
    if (isDeleted) {
        res.send(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
    }
    else {
        res.send(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
}))
    .post('/', basic_auth_1.basicAuth, posts_validators_1.titleValid, posts_validators_1.shortDescriptionValid, posts_validators_1.contentValid, posts_validators_1.blogIdValid, blog_custom_validator_1.isBlogCustomValid, input_validator_1.inputValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, shortDescription, content, blogId } = req.body;
    const blog = yield query_repositories_1.blogsQueryRepository.findBlogById(blogId);
    if (!blog) {
        return res.sendStatus(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
    let newPosts = yield posts_service_1.postsService.createPost(title, shortDescription, content, blogId, blog.name);
    res.status(statuses_1.HTTP_STATUSES.CREATED_201).send(newPosts);
}))
    .put('/:id', basic_auth_1.basicAuth, posts_validators_1.titleValid, posts_validators_1.shortDescriptionValid, posts_validators_1.contentValid, posts_validators_1.blogIdValid, blog_custom_validator_1.isBlogCustomValid, input_validator_1.inputValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isUpdate = yield posts_service_1.postsService.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    if (isUpdate) {
        return res.sendStatus(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
    }
    else {
        return res.sendStatus(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
}))
    .delete('/testing/all-date', basic_auth_1.basicAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield res.send(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
}));
