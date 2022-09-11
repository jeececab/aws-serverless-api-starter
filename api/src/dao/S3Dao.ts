export class S3Dao {
    pathName: string;

    constructor(pathName: string) {
        this.pathName = pathName;
    }

    create(entity: any) {
        return entity;
    }
}
