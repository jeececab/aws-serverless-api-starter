import Ajv, { ValidateFunction } from 'ajv';

import { BaseManager } from './BaseManager';
import { IHttpRequest } from './HttpRequest';
import { IHttpResponse } from './HttpResponse';
import { BadRequestException, ServerErrorException } from '../exceptions/all';
import { BaseModel, IBaseModel } from './BaseModel';

const ajv = new Ajv();

export class BaseController {
    entity: typeof BaseModel;
    manager: BaseManager;
    validate: ValidateFunction;

    constructor(entity: any) {
        this.entity = entity;
        this.manager = new BaseManager(entity);
        this.validate = ajv.compile(entity.jsonSchema);
    }

    async read(httpRequest: IHttpRequest, httpResponse: IHttpResponse): Promise<IHttpResponse> {
        const entityId = httpRequest.getPathParam('id');

        if (!entityId) {
            throw new BadRequestException('ID path parameter is required');
        }

        const entity = await this.manager.read(entityId);

        return httpResponse.setStatusCode(200).setBody(entity);
    }

    async readMany(_httpRequest: IHttpRequest, httpResponse: IHttpResponse): Promise<IHttpResponse> {
        httpResponse.setStatusCode(200).setBody([
            { id: '1', name: 'John' },
            { id: '2', name: 'Lucy' },
        ]);
        return httpResponse;
    }

    async create(httpRequest: IHttpRequest, httpResponse: IHttpResponse): Promise<IHttpResponse> {
        const body = httpRequest.getBody();

        if (!body) {
            throw new BadRequestException('Body is required');
        }

        const candidate = new this.entity().fromJSON(body as IBaseModel);

        const isValid = this.validate(candidate.toJSON());

        if (!isValid) {
            const errors = this.validate.errors;

            if (!errors) {
                throw new ServerErrorException();
            }

            throw new BadRequestException(JSON.stringify(errors[0]));
        }

        const item = await this.manager.create(candidate);

        return httpResponse.setStatusCode(201).setBody(item);
    }

    async update(httpRequest: IHttpRequest, httpResponse: IHttpResponse): Promise<IHttpResponse> {
        const entityId = httpRequest.getPathParam('id');

        if (!entityId) {
            throw new BadRequestException('ID path parameter is required');
        }

        const body = httpRequest.getBody();

        if (!body) {
            throw new BadRequestException('Body is required');
        }

        const candidate = new this.entity().fromJSON(body as IBaseModel);

        const item = await this.manager.update(entityId, candidate);

        return httpResponse.setStatusCode(200).setBody(item);
    }

    async delete(httpRequest: IHttpRequest, httpResponse: IHttpResponse): Promise<IHttpResponse> {
        const entityId = httpRequest.getPathParam('id');

        if (!entityId) {
            throw new BadRequestException('ID path parameter is required');
        }

        await this.manager.delete(entityId);

        return httpResponse.setStatusCode(200);
    }
}
