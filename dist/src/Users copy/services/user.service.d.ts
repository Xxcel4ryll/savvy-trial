import UserRepository from '../repositories/user.repository';
import PaystackRepository from '../../Paystack/repositories/paystack.repository';
import { CryptoEncrypt } from '../../Globals/providers/encrypt/index';
import { PaystackService } from '../../Globals/providers/payment';
import { FindUserDto } from 'src/Authentication/dtos';
import WalletRepository from 'src/Transactions/repositories/wallet.repository';
import UserFavoritesRepository from '../repositories/user_favorites.repository';
export declare class UserService {
    private cryptoEncrypt;
    private usersRepository;
    private userFavouriteRepository;
    private paymentService;
    private paystackRepository;
    private walletRepository;
    constructor(cryptoEncrypt: CryptoEncrypt, usersRepository: UserRepository, userFavouriteRepository: UserFavoritesRepository, paymentService: PaystackService, paystackRepository: PaystackRepository, walletRepository: WalletRepository);
    find({ email, phoneNumber, id }: FindUserDto): Promise<import("../entities/user.entity").default>;
    create(payload: any): Promise<boolean | import("../entities/user.entity").default>;
    resetPassword(data: any): Promise<boolean>;
    updateAccount({ req, updateInfo }: {
        req: any;
        updateInfo: any;
    }): Promise<{
        message: string;
    }>;
    favoriteProduct(user: any, productId: any): Promise<import("../entities/user_favourite.entity").default>;
    viewFavoriteProduct(user: any): Promise<{
        rows: import("../entities/user_favourite.entity").default[];
        count: number;
    }>;
}
