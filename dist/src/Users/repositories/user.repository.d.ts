import Users from '../entities/user.entity';
export default class UserRepository {
    private readonly userEntity;
    constructor(userEntity: typeof Users);
    findByEmail(email: any): Promise<Users>;
    findByPhone(phoneNumber: any): Promise<Users>;
    findById(id: any): Promise<Users>;
    create(payload: any): Promise<[Users, boolean]>;
    modify(criteriaObj: any, updates: any): Promise<[affectedCount: number]>;
    getUsers(type: any): Promise<{
        rows: Users[];
        count: number;
    }>;
    delete(criteriaObj: any): Promise<number>;
}
