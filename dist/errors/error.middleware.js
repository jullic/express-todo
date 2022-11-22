"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
// middlewar for error handling
const errorMiddleware = (err, req, res, next) => {
    if (!err.statusCode) {
        console.log('loh');
        next(err);
    }
    console.log('responsiruy');
    res.status(err.statusCode);
    res.json({
        response: 'error',
        error: {
            statusCode: err.statusCode,
            message: err.message,
            errors: err.errors
        }
    });
};
exports.errorMiddleware = errorMiddleware;
