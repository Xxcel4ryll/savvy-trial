import WaitList from '../entities/waitlist.entity';
export default class WaitListRepository {
    private readonly waitListEntity;
    constructor(waitListEntity: typeof WaitList);
    create(payload: any, transaction: any): Promise<[WaitList, boolean]>;
    find(criteria: any): Promise<{
        rows: WaitList[];
        count: number;
    }>;
}
