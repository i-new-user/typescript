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
const express_validator_1 = require("express-validator");
const express_1 = require("express");
const statuses_1 = require("../../http/statuses");
const blogs_repositoriy_1 = require("../../repositories/blogs_repositoriy");
const basic_auth_1 = require("../../middleware/basic_auth");
const input_validator_1 = require("../../middleware/input_validator");
exports.blogsRouter = (0, express_1.Router)({});
let nameValid = (0, express_validator_1.body)('name').isString().trim().isLength({ min: 1, max: 15 });
let descriptionValid = (0, express_validator_1.body)('description').trim().isString().isLength({ min: 1, max: 500 });
let websiteUrlValid = (0, express_validator_1.body)('websiteUrl').trim().isString().isLength({ min: 1, max: 100 }).matches('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$');
exports.blogsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let foundEntityes = yield blogs_repositoriy_1.blogsRepository.findBlogs();
    res.send(foundEntityes);
}))
    .get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let foundEntity = yield blogs_repositoriy_1.blogsRepository.findBlogById(req.params.id);
    if (foundEntity) {
        res.send(foundEntity);
    }
    else {
        res.sendStatus(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
}))
    .delete('/:id', basic_auth_1.basicAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isDeleted = yield blogs_repositoriy_1.blogsRepository.deleteBlog(req.params.id);
    if (isDeleted) {
        res.send(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
    }
    else {
        res.send(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
}))
    .post('/', basic_auth_1.basicAuth, nameValid, descriptionValid, websiteUrlValid, input_validator_1.inputValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id, name, description, websiteUrl, createdAt, isMembership } = req.body;
    let newBlog = yield blogs_repositoriy_1.blogsRepository.createBlog(id, name, description, websiteUrl, createdAt, isMembership);
    res.status(statuses_1.HTTP_STATUSES.CREATED_201).send(newBlog);
}))
    .put('/:id', basic_auth_1.basicAuth, nameValid, descriptionValid, websiteUrlValid, input_validator_1.inputValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isUpdate = yield blogs_repositoriy_1.blogsRepository.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl);
    if (isUpdate) {
        res.sendStatus(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
    }
    else {
        res.sendStatus(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
}))
    .delete('/testing/all-data', basic_auth_1.basicAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield res.send(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
}));
