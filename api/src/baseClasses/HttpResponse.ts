import { IBaseException } from '../exceptions/all';

export interface IHttpResponse {
    headers: { [key: string]: string };
    statusCode: number;
    body: string;

    setHeader: (key: string, value: any) => IHttpResponse;
    setStatusCode: (code: number) => IHttpResponse;
    getStatusCode: () => number;
    setBody: (value: object | string) => IHttpResponse;
    setException: (error: IBaseException) => IHttpResponse;
}

export class HttpResponse implements IHttpResponse {
    headers: { [key: string]: string };
    statusCode: number;
    body!: string;

    constructor(requestOrigin: string) {
        this.statusCode = 200;
        this.headers = {};

        this.setHeader('Vary', 'Origin');
        this.setHeader('Access-Control-Allow-Origin', requestOrigin);
        this.setHeader('Content-Type', 'application/json');
    }

    setHeader(key: string, value: any): IHttpResponse {
        this.headers[key.toLowerCase()] = value;
        return this;
    }

    setStatusCode(code: number): IHttpResponse {
        this.statusCode = code;
        return this;
    }

    getStatusCode(): number {
        return this.statusCode;
    }

    setBody(value: object | string): IHttpResponse {
        this.body = typeof value === 'object' ? JSON.stringify(value) : value;
        return this;
    }

    setException(error: IBaseException): IHttpResponse {
        this.setStatusCode(error.statusCode || 500);
        this.setHeader('Content-Type', error.message.charAt(0) === '{' ? 'application/json' : 'text/plain');
        this.setBody(error.message);
        return this;
    }
}
