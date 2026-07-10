export class AppError extends Error {
    constructor(
        public message: string,
        public readonly statusCode: number
    ){
        super(message);
        this.name = this.constructor.name;
    }
}

export class NotFoundError extends AppError {
    constructor( message = "Resource not found" ) {
        super(message, 404);
    }
}

export class ForbiddenError extends AppError {
    constructor(message = "Forbidden") {
        super(message, 403);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}

export class ValidationError extends AppError {
    constructor(message = "Validation error") {
        super(message, 400);
    }
}