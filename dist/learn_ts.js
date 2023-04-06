"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerTwo = void 0;
const express_1 = require("express");
exports.routerTwo = (0, express_1.Router)();
exports.routerTwo.get('/', (req, res) => {
    res.send('This two page');
});
