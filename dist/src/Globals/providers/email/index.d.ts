import Nodemailer from './nodemailer';
export declare class Email {
    emailProvider: Nodemailer;
    constructor();
    send(templateName: any, options: any): Promise<void>;
    html(templateName: any, context: any): any;
}
