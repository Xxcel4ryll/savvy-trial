import Paystack from './paystack';
export declare class PaystackService {
    paymentProvider: Paystack;
    constructor();
    customer(customer: any): Promise<any>;
    fetchCustomer(customer: any): Promise<any>;
    generate(customer: any): Promise<any>;
    cardDeposit(card: any): Promise<any>;
    verifyTransaction(reference: any): Promise<any>;
    banks(): Promise<void>;
}
