"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const video_router_1 = require("./routers/video_router");
exports.app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
exports.app.use(body_parser_1.default.json());
exports.app.use((0, cors_1.default)());
exports.app.use('/videos', video_router_1.videosRouter);
exports.app.use('/testing/all-data', video_router_1.deleteAllVideosRouter);
exports.app.get('/', (req, res) => {
    res.send('EXPRESS');
});
exports.app.listen(PORT, () => {
    console.log("START EXPRESS");
});
