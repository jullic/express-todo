import { ErrorRequestHandler } from 'express';
import { BaseError } from './http-errors';

// middlewar for error handling
export const errorMiddleware: ErrorRequestHandler = (err: BaseError, req, res, next) => {
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

