import { HttpStatus } from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { Request } from 'express';
import { FindDataRequestDto } from 'src/dto/request/find.data.request.dto';
export declare class TransactionController {
    private transactionService;
    constructor(transactionService: TransactionService);
    getTransactions(req: Request): Promise<{
        rows: import("../entities/transaction.entity").default[];
        count: number;
    }>;
    getWallet(req: Request): Promise<{
        walletBalance: number;
        wallet: import("../entities/wallet.entity").default[];
    }>;
    payment(req: Request, payload: object): Promise<any>;
    verifyPayment(req: Request, payload: object): Promise<void>;
    transactionWebhook(webhook: object): Promise<any>;
    fetchPurchaseProduct(query: FindDataRequestDto): Promise<{
        status: HttpStatus;
        message: string;
        data: any;
        meta: {
            total_items: number;
            total_pages: number;
            current_page: number;
        };
    }>;
    editPurchaedProductsStatus({ id }: {
        id: any;
    }, query: any): Promise<{
        status: HttpStatus;
        message: string;
    }>;
}
