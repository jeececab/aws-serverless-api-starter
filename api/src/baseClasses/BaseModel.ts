interface IBaseModel {
    id?: string;
    created: string;
    updated?: string;
    version?: number;
}

interface IBaseDynamoDbModel extends IBaseModel {
    pk: string;
    sk?: string;
}

interface IBaseS3Model extends IBaseModel {
    id: string;
}

export class BaseModel implements IBaseModel {
    id?: string;
    created!: string;
    updated?: string;
    version?: number;

    // HTTP
    fromHttp(payload: IBaseModel): this {
        this.updated = payload.updated;
        this.version = payload.version;

        return this;
    }

    toHttp(): IBaseModel {
        return this;
    }

    // DynamoDb if required
    composeId(pk: string, sk?: string): string {
        if (pk.includes('#')) {
            throw new Error('PK should only include raw value');
        }

        if (sk) {
            return `${pk}#${sk}`;
        }

        return pk;
    }

    decomposeId(id: string): { pk: string; sk?: string } {
        if (id.includes('#')) {
            const parts = id.split('#');
            return {
                pk: parts[0],
                sk: parts[1],
            };
        }

        return {
            pk: id,
        };
    }

    toDynamoDb(): IBaseDynamoDbModel {
        if (!this.id) {
            throw new Error('ID is required');
        }

        const { pk, sk } = this.decomposeId(this.id);

        return {
            pk,
            sk,
            created: this.created,
            updated: this.updated,
            version: this.version,
        };
    }

    fromDynamoDb(item: IBaseDynamoDbModel): this {
        this.id = this.composeId(item.pk, item.sk);
        this.created = item.created;
        this.updated = item.updated;
        this.version = item.version ?? 1;

        return this;
    }

    // S3 if required
    toS3(): IBaseS3Model {
        if (!this.id) {
            throw new Error('ID is required');
        }

        return {
            id: this.id,
            created: this.created,
            updated: this.updated,
            version: this.version,
        };
    }

    fromS3(object: IBaseS3Model): this {
        this.updated = object.updated;
        this.version = object.version ?? 1;

        return this;
    }
}
