"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBlogCustom = void 0;
const express_validator_1 = require("express-validator");
const blogs_repositoty_1 = require("../repositories/blogs_repositoty");
exports.isBlogCustom = (0, express_validator_1.body)('blogId').custom((blogId) => {
    const blog = blogs_repositoty_1.blogsRepository.findBlogById(blogId);
    if (!blog) {
        throw Error(`Doesn't blog`);
    }
    else {
        return true;
    }
});
