"use strict";
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
exports.blogsRouter.get('/', (req, res) => {
    let blogs = blogs_repositoriy_1.blogsRepository.findBlogs();
    res.send(blogs);
})
    .get('/:id', (req, res) => {
    let blog = blogs_repositoriy_1.blogsRepository.findBlogById(req.params.id);
    if (blog) {
        res.send(blog);
    }
    else {
        res.sendStatus(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
})
    .delete('/:id', basic_auth_1.basicAuth, (req, res) => {
    let isDeleted = blogs_repositoriy_1.blogsRepository.deleteBlog(req.params.id);
    if (isDeleted) {
        res.send(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
    }
    else {
        res.send(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
})
    .post('/', basic_auth_1.basicAuth, nameValid, descriptionValid, websiteUrlValid, input_validator_1.inputValidation, (req, res) => {
    let { id, name, description, websiteUrl } = req.body;
    let newBlog = blogs_repositoriy_1.blogsRepository.createBlog(id, name, description, websiteUrl);
    res.status(statuses_1.HTTP_STATUSES.CREATED_201).send(newBlog);
})
    .put('/:id', basic_auth_1.basicAuth, nameValid, descriptionValid, websiteUrlValid, input_validator_1.inputValidation, (req, res) => {
    let isUpdate = blogs_repositoriy_1.blogsRepository.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl);
    if (isUpdate) {
        res.sendStatus(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
    }
    else {
        res.sendStatus(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
})
    .delete('/testing/all-data', basic_auth_1.basicAuth, (req, res) => {
    res.send(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
});
