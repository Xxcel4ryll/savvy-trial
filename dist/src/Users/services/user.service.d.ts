import UserRepository from '../repositories/user.repository';
import PaystackRepository from '../../Paystack/repositories/paystack.repository';
import { CryptoEncrypt } from '../../Globals/providers/encrypt/index';
import { Wallet } from '../../Globals/providers/payment';
import { FindUserDto } from 'src/Authentication/dtos';
import WalletRepository from 'src/Transactions/repositories/wallet.repository';
export declare class UserService {
    private cryptoEncrypt;
    private usersRepository;
    private paymentService;
    private paystackRepository;
    private walletRepository;
    constructor(cryptoEncrypt: CryptoEncrypt, usersRepository: UserRepository, paymentService: Wallet, paystackRepository: PaystackRepository, walletRepository: WalletRepository);
    find({ email, phoneNumber, id }: FindUserDto): Promise<import("../entities/user.entity").default>;
    create(payload: any): Promise<boolean | import("../entities/user.entity").default>;
    resetPassword(data: any): Promise<boolean>;
    updateAccount({ req, updateInfo }: {
        req: any;
        updateInfo: any;
    }): Promise<{
        message: string;
    }>;
}
