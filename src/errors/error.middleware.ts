import { ErrorRequestHandler } from 'express';
import { BaseError } from './http-errors';

export const errorMiddleware: ErrorRequestHandler = (err: BaseError, req, res, next) => {
	if (!err.statusCode) {
		next(err);
	}
	res.status(err.statusCode);
	res.json({
		response: 'error',
		error: {
			statusCode: err.statusCode,
			message: err.message,
		}
	});
};
