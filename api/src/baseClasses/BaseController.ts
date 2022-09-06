import { NotImplementedException } from '../exceptions/all';
import { IHttpRequest } from './HttpRequest';
import { IHttpResponse } from './HttpResponse';

export type IAuthenticatedUser = { id: string } | null; // TODO: create user props interface

interface IBaseController {
    name: string;
}

export class BaseController implements IBaseController {
    name!: string;

    setName(name: string) {
        this.name = name;
    }

    async processRequest(
        httpRequest: IHttpRequest,
        httpResponse: IHttpResponse,
        _loggedUser: IAuthenticatedUser
    ): Promise<IHttpResponse> {
        switch (true) {
            case httpRequest.isGet():
                if (httpRequest.isWithId()) {
                    await this.read();
                } else {
                    await this.readMany();
                }
                break;
            case httpRequest.isPost():
                await this.create();
                break;
            case httpRequest.isPut():
                await this.update();
                break;
            case httpRequest.isDelete():
                await this.delete();
                break;
        }

        return httpResponse;
    }

    async read() {
        throw new NotImplementedException();
    }

    async readMany() {
        throw new NotImplementedException();
    }

    async create() {
        throw new NotImplementedException();
    }

    async update() {
        throw new NotImplementedException();
    }

    async delete() {
        throw new NotImplementedException();
    }
}
