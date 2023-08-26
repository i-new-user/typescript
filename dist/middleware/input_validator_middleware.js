"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationMiddlevare = void 0;
const http_statuses_1 = require("../HTTP/http_statuses");
const express_validator_1 = require("express-validator");
const inputValidationMiddlevare = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(http_statuses_1.HTTP_STATUSES.BAD_REQUEST_400).json({ errorsMessages: errors.array({ onlyFirstError: true }) });
    }
    return next();
};
exports.inputValidationMiddlevare = inputValidationMiddlevare;
