export class DynamoDbDao {
    tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    create(entity: any) {
        return entity;
    }
}
