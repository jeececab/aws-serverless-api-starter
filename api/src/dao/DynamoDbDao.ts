export class DynamoDbDao {
    tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    async create(entity: any) {
        return entity;
    }

    async update(id: string, candidate: any) {
        return { ...candidate, id, created: 'some_date' };
    }

    async delete(id: string) {
        return id;
    }
}
