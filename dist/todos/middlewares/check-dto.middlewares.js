"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUpdateTodoDto = exports.checkCreateTodoDto = void 0;
const express_validator_1 = require("express-validator");
exports.checkCreateTodoDto = [
    (0, express_validator_1.body)('text').isString().isLength({ min: 1 }),
];
exports.checkUpdateTodoDto = [
    (0, express_validator_1.body)('text').isString().isLength({ min: 1 }),
    (0, express_validator_1.body)('compteled').optional().isBoolean(),
];
