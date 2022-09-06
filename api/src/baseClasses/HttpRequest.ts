import {
    APIGatewayProxyEvent,
    APIGatewayProxyEventMultiValueHeaders,
    APIGatewayProxyEventMultiValueQueryStringParameters,
} from 'aws-lambda';
import { NotImplementedException } from '../exceptions/all';

enum EHttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export interface IHttpRequest {
    claims: { [key: string]: string } | null;
    path: string;
    method: EHttpMethod;
    multiValueQueryStringParameters: APIGatewayProxyEventMultiValueQueryStringParameters | null;
    multiValueHeaders: APIGatewayProxyEventMultiValueHeaders;
    isBase64Encoded: Boolean;
    body: string | null;

    isAuthenticated(): boolean;
    isWithId(): boolean;

    isGet(): boolean;
    isPost(): boolean;
    isPut(): boolean;
    isDelete(): boolean;

    getHeader(key: string): string | string[] | undefined;
    getRawBody(): string | null;
    getBody(): string | null;
    getQueryParam(name: string): string | string[] | undefined;
}

export class HttpRequest implements IHttpRequest {
    claims: { [key: string]: string } | null;
    path: string;
    method: EHttpMethod;
    multiValueQueryStringParameters: APIGatewayProxyEventMultiValueQueryStringParameters | null;
    multiValueHeaders: APIGatewayProxyEventMultiValueHeaders;
    isBase64Encoded: Boolean;
    rawBody: string | null;
    body!: string | null;

    constructor(event: APIGatewayProxyEvent) {
        const {
            httpMethod,
            path,
            multiValueHeaders,
            multiValueQueryStringParameters,
            body,
            isBase64Encoded,
            requestContext,
        } = event;

        this.claims = requestContext.authorizer ? requestContext.authorizer.claims : null;
        this.path = path;
        this.method = httpMethod as unknown as EHttpMethod;
        this.multiValueQueryStringParameters = multiValueQueryStringParameters;
        this.multiValueHeaders = multiValueHeaders;
        this.isBase64Encoded = isBase64Encoded;
        this.rawBody = body;
    }

    isAuthenticated(): boolean {
        return Boolean(this.claims);
    }

    isWithId(): boolean {
        throw new NotImplementedException();
    }

    isGet(): boolean {
        return this.method === EHttpMethod.GET;
    }

    isPost(): boolean {
        return this.method === EHttpMethod.POST;
    }

    isPut(): boolean {
        return this.method === EHttpMethod.PUT;
    }

    isDelete(): boolean {
        return this.method === EHttpMethod.DELETE;
    }

    getHeader(key: string): string | string[] | undefined {
        if (!this.multiValueHeaders) {
            return;
        }

        return this.multiValueHeaders[key.toLowerCase()];
    }

    getRawBody(): string | null {
        return this.rawBody;
    }

    getBody(): string | null {
        if (!this.body) {
            let body = this.getRawBody();

            if (!body) {
                return null;
            }

            if (this.isBase64Encoded) {
                body = Buffer.from(body, 'base64').toString('ascii');
            }
            if (this.getHeader('Content-Type') === 'application/json') {
                body = JSON.parse(body);
            }
            this.body = body;
        }

        return this.body;
    }

    getQueryParam(name: string): string | string[] | undefined {
        if (!this.multiValueQueryStringParameters) {
            return;
        }

        const value = this.multiValueQueryStringParameters[name];

        if (Array.isArray(value) && value.length === 1) {
            return value[0];
        }

        return value;
    }
}