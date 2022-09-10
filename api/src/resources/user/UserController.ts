import { BaseController, IAuthenticatedUser } from '../../baseClasses/BaseController';
import { IHttpResponse } from '../../baseClasses/HttpResponse';
import { IBaseException, NotAuthenticatedException } from '../../exceptions/all';

export class UserController extends BaseController {
    async getMe(httpResponse: IHttpResponse, loggedUser: IAuthenticatedUser | null) {
        try {
            if (!loggedUser) {
                throw new NotAuthenticatedException();
            }

            httpResponse.setStatusCode(200).setBody(loggedUser);
        } catch (error) {
            httpResponse.setException(error as IBaseException);
        }

        return httpResponse;
    }
}
