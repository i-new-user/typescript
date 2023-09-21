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
exports.isBlogCustomValid = void 0;
const express_validator_1 = require("express-validator");
const query_repositories_1 = require("../repositories/blogs/query_repositories");
exports.isBlogCustomValid = (0, express_validator_1.body)('blogId').custom((blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield query_repositories_1.blogsQueryRepository.findBlogById(blogId);
    if (!blog) {
        throw Error('Does not blog');
    }
    else {
        return true;
    }
}));
