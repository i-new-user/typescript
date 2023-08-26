"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const http_statuses_1 = require("../HTTP/http_statuses");
const blogs_repositoty_1 = require("../repositories/blogs_repositoty");
const express_validator_1 = require("express-validator");
const unauthorized_middlevare_1 = require("../middleware/unauthorized_middlevare");
const input_validator_middleware_1 = require("../middleware/input_validator_middleware");
exports.blogsRouter = (0, express_1.Router)({});
let nameValidation = () => (0, express_validator_1.body)('name').isString().trim().isLength({ min: 1, max: 15 }).withMessage('name error');
let descriptionValidation = () => (0, express_validator_1.body)('description').isString().trim().isLength({ min: 1, max: 500 }).withMessage('description error');
let websiteUrlValidation = () => (0, express_validator_1.body)('websiteUrl').isString().trim().isLength({ min: 1, max: 100 }).isURL({ protocols: ['https'] }).withMessage('websiteUrl error');
let blogIdValidation = (0, express_validator_1.body)('blogId').custom((blogId) => {
    const blogArray = blogs_repositoty_1.blogsRepository.findBlogs();
    const foundMatchId = blogArray.filter((id, index) => blogId === blogArray[index].id);
    return foundMatchId.length > 0;
});
exports.blogsRouter.get('/', (req, res) => {
    let allBlogs = blogs_repositoty_1.blogsRepository.findBlogs();
    res.send(allBlogs);
})
    .post('/', unauthorized_middlevare_1.unauthorized_middleware, nameValidation(), descriptionValidation(), websiteUrlValidation(), 
// inputValidationMiddlevare, 
(req, res) => {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty) {
        res.status(http_statuses_1.HTTP_STATUSES.BAD_REQUEST_400).json({ result, : .array() });
    }
    let newBlog = blogs_repositoty_1.blogsRepository.createBlog(req.body.name, req.body.description, req.body.websiteUrl);
    res.sendStatus(http_statuses_1.HTTP_STATUSES.CREATED_201).send(newBlog);
})
    .get('/:id', (req, res) => {
    let blog = blogs_repositoty_1.blogsRepository.findBlogById(req.params.id);
    if (blog) {
        res.send(blog);
    }
    else {
        res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
})
    .put('/:id', unauthorized_middlevare_1.unauthorized_middleware, nameValidation(), descriptionValidation(), websiteUrlValidation(), input_validator_middleware_1.inputValidationMiddlevare, (req, res) => {
    let updateBlog = blogs_repositoty_1.blogsRepository.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl);
    if (!updateBlog) {
        return res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
    res.sendStatus(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
})
    .delete('/:id', unauthorized_middlevare_1.unauthorized_middleware, (req, res) => {
    blogs_repositoty_1.blogsRepository.deleteBlogById(req.params.id)
        ? res.sendStatus(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204)
        : res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
});
