import { JSONSchemaType } from 'ajv';

import { BaseModel, IBaseModel } from '../../baseClasses/BaseModel';

export interface IUser extends IBaseModel {
    name: string;
}
export class User extends BaseModel implements IUser {
    name!: string;

    static tableName: string = 'user.Account';

    static jsonSchema: JSONSchemaType<IUser> = {
        type: 'object',
        required: ['name'],
        properties: {
            id: { type: 'string', nullable: true },
            created: { type: 'string', nullable: true },
            updated: { type: 'string', nullable: true },
            version: { type: 'number', nullable: true },
            name: { type: 'string', minLength: 4, maxLength: 16 },
        },
    };

    fromJSON(json: IUser): this {
        super.fromJSON(json);

        this.name = json.name;

        return this;
    }

    toJSON(): IUser {
        const json = super.toJSON() as IUser;

        if (this.name) {
            json.name = this.name;
        }

        return json;
    }
}
