"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unauthorized_middleware = void 0;
const http_statuses_1 = require("../HTTP/http_statuses");
const unauthorized_middleware = (req, res, next) => {
    var _a, _b;
    let base = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[0];
    let data = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
    if ((base !== 'Basic') || (data !== 'YWRtaW46cXdlcnR5')) {
        res.status(http_statuses_1.HTTP_STATUSES.UNAUTHORIZED_401).end();
        return;
    }
    if ((base === 'Basic') || (data === 'YWRtaW46cXdlcnR5')) {
        next();
    }
};
exports.unauthorized_middleware = unauthorized_middleware;
