import { BaseController, IAuthenticatedUser } from '../../baseClasses/BaseController';
import { IHttpRequest } from '../../baseClasses/HttpRequest';
import { IHttpResponse } from '../../baseClasses/HttpResponse';
import { IBaseException, NotAuthenticatedException } from '../../exceptions/all';

export class UserController extends BaseController {
    constructor() {
        super();
        this.setName('user');
    }

    async processRequest(
        httpRequest: IHttpRequest,
        httpResponse: IHttpResponse,
        loggedUser: IAuthenticatedUser
    ): Promise<IHttpResponse> {
        let response = await super.processRequest(httpRequest, httpResponse, loggedUser);

        if (response) {
            return response;
        }

        if (httpRequest.path === '/me') {
            return await this.getMe(httpResponse, loggedUser);
        }

        return httpResponse;
    }

    async getMe(httpResponse: IHttpResponse, loggedUser: IAuthenticatedUser | null) {
        try {
            if (!loggedUser) {
                throw new NotAuthenticatedException();
            }

            httpResponse.setBody(loggedUser);
        } catch (error) {
            httpResponse.setException(error as IBaseException);
        }

        return httpResponse;
    }
}
