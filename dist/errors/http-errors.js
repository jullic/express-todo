"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = exports.ForbiddenError = exports.NotFoundError = exports.UnauthorizedError = exports.BaseError = void 0;
// http errors
class BaseError extends Error {
    constructor(statusCode, message, errors) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.errors = errors;
        this.name = Error.name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this);
    }
}
exports.BaseError = BaseError;
class UnauthorizedError extends BaseError {
    constructor(message) {
        super(401, message);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class NotFoundError extends BaseError {
    constructor(message) {
        super(404, message);
    }
}
exports.NotFoundError = NotFoundError;
class ForbiddenError extends BaseError {
    constructor(message) {
        super(403, message);
    }
}
exports.ForbiddenError = ForbiddenError;
class BadRequestError extends BaseError {
    constructor(message) {
        super(400, message);
    }
}
exports.BadRequestError = BadRequestError;
