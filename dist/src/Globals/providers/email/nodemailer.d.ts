import { Logger } from '../log';
export default class Nodemailer {
    private Log;
    host: any;
    port: any;
    user: any;
    orgName: any;
    password: any;
    secure: any;
    enableTestAccount: boolean;
    constructor(enableTestAccount?: boolean, Log?: typeof Logger);
    createTransport(): Promise<any>;
    send(message: any, options: any): Promise<void>;
}
