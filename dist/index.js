"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = void 0;
const app_1 = require("./app");
exports.port = 3000;
app_1.app.listen(exports.port, () => {
    console.log(`Example app listening on port ${exports.port}`);
});
