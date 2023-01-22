export default class Paystack {
    apiKey: any;
    secretKey: any;
    baseUrl: any;
    paystackAPI: import("axios").AxiosInstance;
    constructor(options?: {});
    createCustomer(customer: any): Promise<any>;
    fetchCustomer(customer: any): Promise<any>;
    generateWallet(customer: any): Promise<any>;
    cardDeposit(card: any): Promise<any>;
    verifyTransaction({ reference }: {
        reference: any;
    }): Promise<any>;
}
