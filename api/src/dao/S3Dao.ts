export class S3Dao {
    pathName: string;

    constructor(pathName: string) {
        this.pathName = pathName;
    }

    async create(candidate: any) {
        return candidate;
    }

    async update(id: string, candidate: any) {
        return { ...candidate, id, created: 'some_date' };
    }

    async delete(id: string) {
        return id;
    }
}
