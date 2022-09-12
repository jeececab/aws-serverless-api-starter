import { BaseController } from './BaseController';
import { IHttpRequest } from './HttpRequest';
import { IHttpResponse } from './HttpResponse';
import { NotAuthenticatedException } from '../exceptions/all';

export type IAuthenticatedUser = { id: string } | null;
export const scriptAgent: IAuthenticatedUser = { id: 'script_agent' };

export class BaseRouter {
    controller!: BaseController;
    resourceName: string;

    constructor(resourceName: string) {
        this.resourceName = resourceName;
    }

    async processRequest(
        httpRequest: IHttpRequest,
        httpResponse: IHttpResponse,
        loggedUser: IAuthenticatedUser
    ): Promise<IHttpResponse> {
        if (!loggedUser) {
            throw new NotAuthenticatedException();
        }

        if (httpRequest.path !== this.resourceName) {
            return httpResponse;
        }

        switch (true) {
            case httpRequest.isGet():
                if (httpRequest.hasPathId()) {
                    return await this.controller.read(httpRequest, httpResponse);
                } else {
                    return await this.controller.readMany(httpRequest, httpResponse);
                }
            case httpRequest.isPost():
                return await this.controller.create(httpRequest, httpResponse);
            case httpRequest.isPut():
                return await this.controller.update(httpRequest, httpResponse);
            case httpRequest.isDelete():
                return await this.controller.delete(httpRequest, httpResponse);
            default:
                return httpResponse;
        }
    }
}
