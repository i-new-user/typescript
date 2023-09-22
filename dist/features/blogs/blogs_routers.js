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
exports.blogsRouter = void 0;
const express_1 = require("express");
const statuses_1 = require("../../http/statuses");
const blogs_service_1 = require("../../domain/blogs_service");
const query_repositories_1 = require("../../repositories/blogs/query_repositories");
const posts_service_1 = require("../../domain/posts_service");
const basic_auth_1 = require("../../middleware/basic_auth");
const input_validator_1 = require("../../middleware/input_validator");
const blogs_validators_1 = require("../../middleware/blogs_validators");
const posts_validators_1 = require("../../middleware/posts_validators");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const searchNameTerm = (_a = req.query.searchNameTerm) !== null && _a !== void 0 ? _a : null;
    const sortBy = (_b = req.query.sortBy) !== null && _b !== void 0 ? _b : "createdAt";
    const sortDirection = req.query.sortDirection === "asc" ? 1 : -1;
    const pageNumber = (_c = req.query.pageNumber) !== null && _c !== void 0 ? _c : '1';
    const pageSize = (_d = req.query.pageSize) !== null && _d !== void 0 ? _d : '10';
    let foundEntityes = yield query_repositories_1.blogsQueryRepository.findBlogs(searchNameTerm, sortDirection, sortBy, pageNumber, pageSize);
    res.send(foundEntityes);
}))
    .get('/:id/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g;
    const isEntity = yield query_repositories_1.blogsQueryRepository.findBlogById(req.params.id);
    if (!isEntity) {
        return res.sendStatus(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
    const sortBy = (_e = req.query.sortBy) !== null && _e !== void 0 ? _e : "createdAt";
    const sortDirection = req.query.sortDirection === "asc" ? 1 : -1;
    const pageNumber = (_f = req.query.pageNumber) !== null && _f !== void 0 ? _f : '1';
    const pageSize = (_g = req.query.pageSize) !== null && _g !== void 0 ? _g : '10';
    let foundEntity = yield query_repositories_1.blogsQueryRepository.findBlogByIdPosts(req.params.id, sortDirection, sortBy, pageNumber, pageSize);
    if (foundEntity) {
        res.send(foundEntity);
    }
    else {
        res.sendStatus(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
}))
    .get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let foundEntity = yield query_repositories_1.blogsQueryRepository.findBlogById(req.params.id);
    if (foundEntity) {
        res.send(foundEntity);
    }
    else {
        res.sendStatus(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
}))
    .post('/:id/posts', basic_auth_1.basicAuth, posts_validators_1.titleValid, posts_validators_1.shortDescriptionValid, posts_validators_1.contentValid, input_validator_1.inputValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let blogId = req.params.id;
    let { title, shortDescription, content } = req.body;
    const blog = yield query_repositories_1.blogsQueryRepository.findBlogById(blogId);
    if (!blog) {
        return res.sendStatus(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
    let newPost = yield posts_service_1.postsService.createPost(title, shortDescription, content, blogId, blog.name);
    res.status(statuses_1.HTTP_STATUSES.CREATED_201).send(newPost);
}))
    .post('/', basic_auth_1.basicAuth, blogs_validators_1.nameValid, blogs_validators_1.descriptionValid, blogs_validators_1.websiteUrlValid, input_validator_1.inputValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, description, websiteUrl } = req.body;
    let newBlog = yield blogs_service_1.blogsService.createBlog(name, description, websiteUrl);
    res.status(statuses_1.HTTP_STATUSES.CREATED_201).send(newBlog);
}))
    .put('/:id', basic_auth_1.basicAuth, blogs_validators_1.nameValid, blogs_validators_1.descriptionValid, blogs_validators_1.websiteUrlValid, input_validator_1.inputValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isUpdate = yield blogs_service_1.blogsService.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl);
    if (isUpdate) {
        res.sendStatus(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
    }
    else {
        res.sendStatus(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
}))
    .delete('/:id', basic_auth_1.basicAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isDeleted = yield blogs_service_1.blogsService.deleteBlog(req.params.id);
    if (isDeleted) {
        res.send(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
    }
    else {
        res.send(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
}))
    .delete('/testing/all-data', basic_auth_1.basicAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield res.send(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
}));
