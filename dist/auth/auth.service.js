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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_service_1 = require("../config/config.service");
const http_errors_1 = require("../errors/http-errors");
const user_schema_1 = require("../schemas/user.schema");
const auth_constants_1 = require("./auth.constants");
// router data processing service
class AuthService {
    // method for adding a user to the database
    register(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const isUser = yield user_schema_1.UserModel.findOne({ email: dto.email });
            if (isUser) {
                throw new http_errors_1.UnauthorizedError(auth_constants_1.authErrors.ALREADY_REGISTERED_ERROR);
            }
            const { password } = dto, dataDto = __rest(dto, ["password"]);
            const salt = yield (0, bcrypt_1.genSalt)(10);
            // password hashing
            const data = Object.assign(Object.assign({}, dataDto), { passwordHash: yield (0, bcrypt_1.hash)(password, salt) });
            const id = (yield (new user_schema_1.UserModel(data).save()))._id;
            return { id };
        });
    }
    // method for user verification
    validateUser({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_schema_1.UserModel.findOne({ email });
            if (!user) {
                throw new http_errors_1.UnauthorizedError(auth_constants_1.authErrors.USER_NOT_FOUND_ERROR);
            }
            const isCorrectPassword = yield (0, bcrypt_1.compare)(password, user.passwordHash);
            if (!isCorrectPassword) {
                throw new http_errors_1.UnauthorizedError(auth_constants_1.authErrors.USER_NOT_FOUND_ERROR);
            }
            return { id: user._id };
        });
    }
    // method for obtaining a jwt token
    login(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = { id };
            return {
                access_token: jsonwebtoken_1.default.sign(payload, config_service_1.ConfigService.get('SECRET'))
            };
        });
    }
}
exports.AuthService = AuthService;
