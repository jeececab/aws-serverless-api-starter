type Message = null | string | { code: number; message: string };

function setMessage(message: Message, fallbackString: string): string {
    if (!message) {
        return fallbackString;
    }

    if (typeof message === 'object') {
        return JSON.stringify(message);
    }

    return message;
}

export interface IBaseException extends Error {
    readonly statusCode: number;
    readonly message: string;
    readonly cause: Error | null;
}

export class BadGatewayException extends Error implements IBaseException {
    readonly statusCode: number;
    readonly message: string;
    readonly cause: Error | null;

    constructor(message: Message = null, error: Error | null = null) {
        super();
        this.statusCode = 502;
        this.message = setMessage(message, 'Bad Gateway');
        this.cause = error;
    }
}

export class BadRequestException extends Error implements IBaseException {
    readonly statusCode: number;
    readonly message: string;
    readonly cause: Error | null;

    constructor(message: Message = null, error: Error | null = null) {
        super();
        this.statusCode = 400;
        this.message = setMessage(message, 'Bad Request');
        this.cause = error;
    }
}

export class ConflictException extends Error implements IBaseException {
    readonly statusCode: number;
    readonly message: string;
    readonly cause: Error | null;

    constructor(message: Message = null, error: Error | null = null) {
        super();
        this.statusCode = 409;
        this.message = setMessage(message, 'Conflict');
        this.cause = error;
    }
}

export class ForbiddenException extends Error implements IBaseException {
    readonly statusCode: number;
    readonly message: string;
    readonly cause: Error | null;

    constructor(message: Message = null, error: Error | null = null) {
        super();
        this.statusCode = 403;
        this.message = setMessage(message, 'Forbidden');
        this.cause = error;
    }
}

export class NoContentException extends Error implements IBaseException {
    readonly statusCode: number;
    readonly message: string;
    readonly cause: Error | null;

    constructor(message: Message = null, error: Error | null = null) {
        super();
        this.statusCode = 204;
        this.message = setMessage(message, 'No Content');
        this.cause = error;
    }
}

export class NotAuthenticatedException extends Error implements IBaseException {
    readonly statusCode: number;
    readonly message: string;
    readonly cause: Error | null;

    constructor(message: Message = null, error: Error | null = null) {
        super();
        this.statusCode = 401;
        this.message = setMessage(message, 'Not Authenticated');
        this.cause = error;
    }
}

export class NotAuthorizedException extends Error implements IBaseException {
    readonly statusCode: number;
    readonly message: string;
    readonly cause: Error | null;

    constructor(message: Message = null, error: Error | null = null) {
        super();
        this.statusCode = 403;
        this.message = setMessage(message, 'Not Authorized');
        this.cause = error;
    }
}

export class NotFoundException extends Error implements IBaseException {
    readonly statusCode: number;
    readonly message: string;
    readonly cause: Error | null;

    constructor(message: Message = null, error: Error | null = null) {
        super();
        this.statusCode = 404;
        this.message = setMessage(message, 'Not Found');
        this.cause = error;
    }
}

export class NotImplementedException extends Error implements IBaseException {
    readonly statusCode: number;
    readonly message: string;
    readonly cause: Error | null;

    constructor(message: Message = null, error: Error | null = null) {
        super();
        this.statusCode = 501;
        this.message = setMessage(message, 'Not Implemented');
        this.cause = error;
    }
}

export class NotModifiedException extends Error implements IBaseException {
    readonly statusCode: number;
    readonly message: string;
    readonly cause: Error | null;

    constructor(message: Message = null, error: Error | null = null) {
        super();
        this.statusCode = 304;
        this.message = setMessage(message, 'Not Modified');
        this.cause = error;
    }
}

export class ServerErrorException extends Error implements IBaseException {
    readonly statusCode: number;
    readonly message: string;
    readonly cause: Error | null;

    constructor(message: Message = null, error: Error | null = null) {
        super();
        this.statusCode = 500;
        this.message = setMessage(message, 'Server Error');
        this.cause = error;
    }
}

export class TooEarlyException extends Error implements IBaseException {
    readonly statusCode: number;
    readonly message: string;
    readonly cause: Error | null;

    constructor(message: Message = null, error: Error | null = null) {
        super();
        this.statusCode = 425;
        this.message = setMessage(message, 'Too Early');
        this.cause = error;
    }
}
