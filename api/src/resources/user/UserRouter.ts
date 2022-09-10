import { IAuthenticatedUser } from '../../baseClasses/BaseController';
import { BaseRouter } from '../../baseClasses/BaseRouter';
import { IHttpRequest } from '../../baseClasses/HttpRequest';
import { IHttpResponse } from '../../baseClasses/HttpResponse';
import { UserController } from './UserController';

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
        if (httpRequest.isGet() && httpRequest.pathParameters?.userId === 'me') {
            return await this.controller.getMe(httpResponse, loggedUser);
        }

        httpResponse = await super.processRequest(httpRequest, httpResponse, loggedUser, this.controller);

        return httpResponse;
    }
}
