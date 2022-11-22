"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const http_errors_1 = require("./../errors/http-errors");
const auth_service_1 = require("./auth.service");
const express_1 = require("express");
const check_dto_middleware_1 = require("./middlewares/check-dto.middleware");
const express_validator_1 = require("express-validator");
// router for authorization
exports.authRouter = (0, express_1.Router)();
const authService = new auth_service_1.AuthService();
// route for authorization
exports.authRouter.post('/login', check_dto_middleware_1.checkLoginDto, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // check errors
    const errors = (0, express_validator_1.validationResult)(req);
    try {
        if (!errors.isEmpty()) {
            throw new http_errors_1.BaseError(401, 'Некорректные значения', errors.array());
        }
        const { id } = yield authService.validateUser(req.body);
        res.json(yield authService.login(id));
    }
    catch (error) {
        // error handling via middleware
        next(error);
    }
}));
// route for registatrion
exports.authRouter.post('/register', check_dto_middleware_1.checkRegisterDto, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // check errors
    const errors = (0, express_validator_1.validationResult)(req);
    try {
        if (!errors.isEmpty()) {
            throw new http_errors_1.BaseError(401, 'Некорректные значения', errors.array());
        }
        const { id } = yield authService.register(req.body);
        res.status(201);
        res.json(yield authService.login(id));
    }
    catch (error) {
        // error handling via middleware
        next(error);
    }
}));
