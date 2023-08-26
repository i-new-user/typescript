"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const blogs_router_1 = require("./routers/blogs_router");
const posts_router_1 = require("./routers/posts_router");
const test_outer_1 = require("./routers/test_outer");
exports.app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
exports.app.use(body_parser_1.default.json());
exports.app.use((0, cors_1.default)());
exports.app.use('/blogs', blogs_router_1.blogsRouter);
exports.app.use('/posts', posts_router_1.postsRouter);
exports.app.use('/', test_outer_1.testRouter);
exports.app.get('/', (req, res) => {
    res.send('EXPRESS');
});
exports.app.listen(PORT, () => {
    console.log("START EXPRESS");
});
