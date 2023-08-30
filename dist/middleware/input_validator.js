"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidation = void 0;
const statuses_1 = require("../http/statuses");
const express_validator_1 = require("express-validator");
const inputValidation = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(statuses_1.HTTP_STATUSES.BAD_REQUEST_400).json({ errorsMessages: errors.array({ onlyFirstError: false })
        });
    }
    return next();
};
exports.inputValidation = inputValidation;
