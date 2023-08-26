"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const http_statuses_1 = require("../HTTP/http_statuses");
const posts_repository_1 = require("../repositories/posts_repository");
const blogs_repositoty_1 = require("../repositories/blogs_repositoty");
const express_validator_1 = require("express-validator");
const unauthorized_middlevare_1 = require("../middleware/unauthorized_middlevare");
const input_validator_middleware_1 = require("../middleware/input_validator_middleware");
exports.postsRouter = (0, express_1.Router)({});
let titleValidator = () => (0, express_validator_1.body)('title').trim().isLength({ min: 1, max: 30 }).withMessage('title error');
let shortDescriptionValidator = () => (0, express_validator_1.body)('shortDescription').trim().isLength({ min: 1, max: 100 }).withMessage('shortDescription error');
let contentValidator = () => (0, express_validator_1.body)('content').trim().isLength({ min: 1, max: 1000 }).withMessage('content error');
let blogIdValidator = () => (0, express_validator_1.body)('blogId').isString();
exports.postsRouter.get('/', (req, res) => {
    let allPosts = posts_repository_1.postsRepository.findPosts();
    res.send(allPosts);
})
    .post('/', unauthorized_middlevare_1.unauthorized_middleware, titleValidator(), shortDescriptionValidator(), contentValidator(), blogIdValidator(), input_validator_middleware_1.inputValidationMiddlevare, (req, res) => {
    const { title, shortDescription, content, blogId } = req.body;
    const blog = blogs_repositoty_1.blogsRepository.findBlogById(blogId);
    if (!blog) {
        return res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
    let newPost = posts_repository_1.postsRepository.createPost(title, shortDescription, content, blogId, blog.name);
    res.sendStatus(http_statuses_1.HTTP_STATUSES.CREATED_201).send(newPost);
})
    .get('/:id', (req, res) => {
    let post = posts_repository_1.postsRepository.findPostById(req.params.id);
    if (post) {
        res.send(post);
    }
    else {
        res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
})
    .put('/:id', unauthorized_middlevare_1.unauthorized_middleware, titleValidator(), shortDescriptionValidator(), contentValidator(), blogIdValidator(), input_validator_middleware_1.inputValidationMiddlevare, (req, res) => {
    let post = posts_repository_1.postsRepository.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    if (!post) {
        return res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
    res.sendStatus(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
})
    .delete('/:id', unauthorized_middlevare_1.unauthorized_middleware, (req, res) => {
    posts_repository_1.postsRepository.deletePostById(req.params.id)
        ? res.sendStatus(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204)
        : res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
});
