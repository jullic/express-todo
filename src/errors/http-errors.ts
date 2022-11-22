export class BaseError extends Error {
	statusCode: number;
	constructor(statusCode: number, message: string) {
		super(message);
		Object.setPrototypeOf(this, new.target.prototype);
		this.name = Error.name;
		this.statusCode = statusCode;
		Error.captureStackTrace(this);
	}
}

export class UnauthorizedError extends BaseError {
	constructor(message: string) {
		super(401, message);
	}
}

export class NotFoundError extends BaseError {
	constructor(message: string) {
		super(404, message);
	}
}