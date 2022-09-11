import { BaseManager } from '../../baseClasses/BaseManager';
import { User } from './UserModel';

export class UserManager extends BaseManager {
    constructor() {
        super(User);
    }
}
