import { APIGatewayProxyEvent, Context } from 'aws-lambda';

import { HttpRequest } from '../../baseClasses/HttpRequest';
import { HttpResponse, IHttpResponse } from '../../baseClasses/HttpResponse';
import { IBaseException } from '../../exceptions/all';
import { IAuthenticatedUser } from '../../baseClasses/BaseController';

import { UserController } from './UserController';

export async function handler(event: APIGatewayProxyEvent, _context: Context): Promise<IHttpResponse> {
    const httpRequest = new HttpRequest(event);
    const httpResponse = new HttpResponse(httpRequest.getHeader('Origin') as string);

    let processedResponse;
    let loggedUser: IAuthenticatedUser = null;

    try {
        if (httpRequest.isAuthenticated()) {
            loggedUser = { id: 'TODO' };
        }

        const userController = new UserController();

        processedResponse = await userController.processRequest(httpRequest, httpResponse, loggedUser);
    } catch (error) {
        processedResponse = httpResponse.setException(error as IBaseException);
    }

    return processedResponse;
}
