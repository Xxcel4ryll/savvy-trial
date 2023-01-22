export default class Nodemailer {
    host: any;
    port: any;
    user: any;
    password: any;
    secure: any;
    enableTestAccount: boolean;
    constructor(enableTestAccount?: boolean);
    createTransport(): Promise<any>;
    send(message: any, options: any): Promise<void>;
}
