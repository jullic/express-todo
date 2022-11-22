"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_service_1 = require("./../../config/config.service");
const http_errors_1 = require("./../../errors/http-errors");
// middlewar for authorization verification
const checkAuth = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace(/Bearer/gim, '').trim();
    if (!token) {
        throw new http_errors_1.ForbiddenError('Нет доступа');
    }
    const access = jsonwebtoken_1.default.verify(token, config_service_1.ConfigService.get('SECRET'));
    req.body.userId = access.id;
    next();
};
exports.checkAuth = checkAuth;
