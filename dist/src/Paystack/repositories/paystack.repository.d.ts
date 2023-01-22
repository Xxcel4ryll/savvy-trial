import Paystack from '../entities/paystack.entity';
export default class PaystackRepository {
    private readonly paystackEntity;
    constructor(paystackEntity: typeof Paystack);
    find(id: any): Promise<Paystack>;
    create(payload: any): Promise<[Paystack, boolean]>;
}
