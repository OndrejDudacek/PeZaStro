export class customError extends Error {
	statusCode: number;
	message: string;

	constructor(message: string, statusCode: number) {
		super();
		this.message = message;
		this.statusCode = statusCode;
	}
}

export class NotFoundError extends customError {
	constructor(message: string) {
		super(message, 404);
	}
}
export class BadRequestError extends customError {
	constructor(message: string) {
		super(message, 400);
	}
}
export class UnauthorizedError extends customError {
	constructor(message: string) {
		super(message, 401);
	}
}

export class EntityAlreadyExistsError extends customError {
	constructor(message: string) {
		super(message, 422);
	}
}

export class ToManyRequestError extends customError {
	constructor(message: string) {
		super(message, 429);
	}
}
