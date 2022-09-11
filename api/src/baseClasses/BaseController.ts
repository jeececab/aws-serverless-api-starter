import Ajv, { ValidateFunction } from 'ajv';

import { BaseManager } from './BaseManager';
import { IHttpRequest } from './HttpRequest';
import { IHttpResponse } from './HttpResponse';
import { BadRequestException, ServerErrorException } from '../exceptions/all';

const ajv = new Ajv();

export type IAuthenticatedUser = { id: string } | null; // TODO: create user props interface

export class BaseController {
    entity: any;
    manager: BaseManager;
    validate: ValidateFunction;

    constructor(entity: any) {
        this.entity = entity;
        this.manager = new BaseManager(entity);
        this.validate = ajv.compile(entity.jsonSchema);
    }

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

    async create(httpRequest: IHttpRequest, httpResponse: IHttpResponse): Promise<IHttpResponse> {
        const candidate = new this.entity().fromJSON(httpRequest.getBody());

        const isValid = this.validate(candidate.toJSON());

        if (!isValid) {
            const errors = this.validate.errors;

            if (!errors) {
                throw new ServerErrorException();
            }

            throw new BadRequestException(JSON.stringify(errors[0]));
        }

        await this.manager.create(candidate);

        httpResponse.setStatusCode(201).setBody(candidate);

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
