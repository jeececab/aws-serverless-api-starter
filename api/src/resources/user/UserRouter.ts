import { IAuthenticatedUser } from '../../baseClasses/BaseRouter';
import { BaseRouter } from '../../baseClasses/BaseRouter';
import { IHttpRequest } from '../../baseClasses/HttpRequest';
import { IHttpResponse } from '../../baseClasses/HttpResponse';
import { UserController } from './UserController';
import { NotAuthenticatedException } from '../../exceptions/all';

export class UserRouter extends BaseRouter {
    controller: UserController;

    constructor() {
        super('user');
        this.controller = new UserController();
    }

    async processRequest(
        httpRequest: IHttpRequest,
        httpResponse: IHttpResponse,
        loggedUser: IAuthenticatedUser
    ): Promise<IHttpResponse> {
        if (!loggedUser) {
            throw new NotAuthenticatedException();
        }

        if (httpRequest.isGet() && httpRequest.pathParameters?.userId === 'me') {
            return await this.controller.getMe(httpResponse, loggedUser);
        }

        return await super.processRequest(httpRequest, httpResponse, loggedUser);
    }
}
