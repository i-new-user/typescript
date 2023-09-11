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
const express_validator_1 = require("express-validator");
const posts_repositoriy_1 = require("../../repositories/posts_repositoriy");
const basic_auth_1 = require("../../middleware/basic_auth");
const input_validator_1 = require("../../middleware/input_validator");
const blog_custom_validator_1 = require("../../middleware/blog_custom_validator");
exports.postsRouter = (0, express_1.Router)({});
let titleValid = (0, express_validator_1.body)('title').isString().trim().isLength({ min: 1, max: 30 });
let shortDescriptionValid = (0, express_validator_1.body)('shortDescription').trim().isString().isLength({ min: 1, max: 100 });
let contentValid = (0, express_validator_1.body)('content').trim().isString().isLength({ min: 1, max: 1000 });
let blogIdValid = (0, express_validator_1.body)('blogId').isString();
exports.postsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let posts = yield posts_repositoriy_1.postsRepository.findPosts();
    res.send(posts);
}))
    .get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let post = yield posts_repositoriy_1.postsRepository.findPostById(req.params.id);
    if (post) {
        res.send(post);
    }
    else {
        res.sendStatus(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
}))
    .delete('/:id', basic_auth_1.basicAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isDeleted = yield posts_repositoriy_1.postsRepository.deletePost(req.params.id);
    if (isDeleted) {
        res.send(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
    }
    else {
        res.send(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
}))
    .post('/', basic_auth_1.basicAuth, titleValid, shortDescriptionValid, contentValid, blogIdValid, blog_custom_validator_1.isBlogCustomValid, input_validator_1.inputValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, shortDescription, content, blogId } = req.body;
    let newPosts = yield posts_repositoriy_1.postsRepository.createPost(title, shortDescription, content, blogId);
    res.status(statuses_1.HTTP_STATUSES.CREATED_201).send(newPosts);
}))
    .put('/:id', basic_auth_1.basicAuth, titleValid, shortDescriptionValid, contentValid, blogIdValid, blog_custom_validator_1.isBlogCustomValid, input_validator_1.inputValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isUpdate = yield posts_repositoriy_1.postsRepository.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
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
