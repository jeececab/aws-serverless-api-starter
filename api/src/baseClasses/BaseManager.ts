import { ulid } from 'ulid';
import { DynamoDbDao } from '../dao/DynamoDbDao';
import { S3Dao } from '../dao/S3Dao';

// TODO
export enum EDatabase {
    'DynamoDb' = 'DynamoDb',
    'S3' = 'S3',
}

export class BaseManager {
    entity: any;
    dao: DynamoDbDao | S3Dao;

    constructor(entity: any) {
        this.entity = entity;

        if (entity.pathName === EDatabase.S3) {
            this.dao = new S3Dao(entity.pathName);
        } else if (entity.tableName) {
            this.dao = new DynamoDbDao(entity.tableName);
        } else {
            throw new Error('Model must have either a table or a path name');
        }
    }

    async read(id: string): Promise<typeof this.entity> {
        return { id, name: 'John' };
    }

    async readMany(): Promise<typeof this.entity[]> {
        return [
            { id: '1', name: 'John' },
            { id: '2', name: 'Lucy' },
        ];
    }

    async create(candidate: typeof this.entity): Promise<typeof this.entity> {
        candidate.id = ulid();
        candidate.created = new Date().toISOString();
        candidate.updated = new Date().toISOString();

        return await this.dao.create(candidate);
    }

    async update(candidate: typeof this.entity): Promise<typeof this.entity> {
        return candidate;
    }

    async delete(id: string): Promise<string> {
        return id;
    }
}
