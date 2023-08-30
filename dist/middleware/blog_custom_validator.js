"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBlogCustomValid = void 0;
const express_validator_1 = require("express-validator");
const blogs_repositoriy_1 = require("../repositories/blogs_repositoriy");
exports.isBlogCustomValid = (0, express_validator_1.body)('blogId').custom((blogId) => {
    const blog = blogs_repositoriy_1.blogsRepository.findBlogById(blogId);
    if (!blog) {
        throw Error('Does not blog');
    }
    else {
        return true;
    }
});
