import { IHttpResponse } from './HttpResponse';

export type IAuthenticatedUser = { id: string } | null; // TODO: create user props interface

export class BaseController {
    async read(httpResponse: IHttpResponse): Promise<IHttpResponse> {
        httpResponse.setStatusCode(200).setBody({ id: '1', name: 'John' });
        return httpResponse;
    }

    async readMany(httpResponse: IHttpResponse): Promise<IHttpResponse> {
        httpResponse.setStatusCode(200).setBody([
            { id: '1', name: 'John' },
            { id: '2', name: 'Lucy' },
        ]);
        return httpResponse;
    }

    async create(httpResponse: IHttpResponse): Promise<IHttpResponse> {
        httpResponse.setStatusCode(201).setBody({ id: '3', name: 'SomeNewUser' });
        return httpResponse;
    }

    async update(httpResponse: IHttpResponse): Promise<IHttpResponse> {
        httpResponse.setStatusCode(200).setBody({ id: '3', name: 'ModifiedUser' });
        return httpResponse;
    }

    async delete(httpResponse: IHttpResponse): Promise<IHttpResponse> {
        httpResponse.setStatusCode(200);
        return httpResponse;
    }
}
