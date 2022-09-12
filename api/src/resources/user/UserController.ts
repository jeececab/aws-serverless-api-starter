import { BaseController } from '../../baseClasses/BaseController';
import { IHttpResponse } from '../../baseClasses/HttpResponse';
import { IAuthenticatedUser } from '../../baseClasses/BaseRouter';
import { IBaseException, NotAuthenticatedException } from '../../exceptions/all';
import { User } from './UserModel';

export class UserController extends BaseController {
    constructor() {
        super(User);
    }

    async getMe(httpResponse: IHttpResponse, loggedUser: IAuthenticatedUser | null) {
        try {
            if (!loggedUser) {
                throw new NotAuthenticatedException();
            }

            httpResponse.setStatusCode(200).setBody(loggedUser); // TODO: fetch user record in DynamoDb
        } catch (error) {
            httpResponse.setException(error as IBaseException);
        }

        return httpResponse;
    }
}
