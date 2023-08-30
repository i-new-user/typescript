"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicAuth = void 0;
const statuses_1 = require("../http/statuses");
const basicAuth = (req, res, next) => {
    var _a, _b;
    let base = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[0];
    let data = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
    if ((base !== 'Basic') || (data !== 'YWRtaW46cXdlcnR5')) {
        res.status(statuses_1.HTTP_STATUSES.UNAUTHORIZED_401).end();
        return;
    }
    if ((base === 'Basic') || (data === 'YWRtaW46cXdlcnR5')) {
        next();
    }
};
exports.basicAuth = basicAuth;
