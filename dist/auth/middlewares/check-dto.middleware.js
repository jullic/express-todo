"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLoginDto = exports.checkRegisterDto = void 0;
const express_validator_1 = require("express-validator");
const auth_constants_1 = require("../auth.constants");
exports.checkRegisterDto = [
    (0, express_validator_1.body)('name').isString().isLength({ min: 2 }).withMessage(auth_constants_1.authErrors.REGISTER_NAME_LENGTH_ERROR),
    (0, express_validator_1.body)('email').isEmail(),
    (0, express_validator_1.body)('password').isString().isLength({ min: 6 }).withMessage(auth_constants_1.authErrors.REGISTER_PASSWORD_LENGTH_ERROR),
];
exports.checkLoginDto = [
    (0, express_validator_1.body)('email').isEmail(),
    (0, express_validator_1.body)('password').isString(),
];
