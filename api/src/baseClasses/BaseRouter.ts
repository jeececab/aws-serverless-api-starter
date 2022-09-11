import { BaseController, IAuthenticatedUser } from './BaseController';
import { IHttpRequest } from './HttpRequest';
import { IHttpResponse } from './HttpResponse';

export class BaseRouter {
    resourceName: string;

    constructor(resourceName: string) {
        this.resourceName = resourceName;
    }

    async processRequest(
        httpRequest: IHttpRequest,
        httpResponse: IHttpResponse,
        _loggedUser: IAuthenticatedUser,
        controller: BaseController
    ): Promise<IHttpResponse> {
        if (httpRequest.path !== this.resourceName) {
            return httpResponse;
        }

        switch (true) {
            case httpRequest.isGet():
                if (httpRequest.isWithId()) {
                    return await controller.read(httpResponse);
                } else {
                    return await controller.readMany(httpResponse);
                }
            case httpRequest.isPost():
                return await controller.create(httpRequest, httpResponse);
            case httpRequest.isPut():
                return await controller.update(httpResponse);
            case httpRequest.isDelete():
                return await controller.delete(httpResponse);
            default:
                return httpResponse;
        }
    }
}
