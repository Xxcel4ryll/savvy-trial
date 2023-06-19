import UserRepository from '../repositories/user.repository';
import PaystackRepository from '../../Paystack/repositories/paystack.repository';
import { CryptoEncrypt } from '../../Globals/providers/encrypt/index';
import { PaystackService } from '../../Globals/providers/payment';
import { FindUserDto } from 'src/Authentication/dtos';
import WalletRepository from 'src/Transactions/repositories/wallet.repository';
import UserFavoritesRepository from '../repositories/user_favorites.repository';
import { FileService } from 'src/Files/services/file.service';
export declare class UserService {
    private cryptoEncrypt;
    private usersRepository;
    private userFavouriteRepository;
    private paymentService;
    private paystackRepository;
    private walletRepository;
    private fileService;
    constructor(cryptoEncrypt: CryptoEncrypt, usersRepository: UserRepository, userFavouriteRepository: UserFavoritesRepository, paymentService: PaystackService, paystackRepository: PaystackRepository, walletRepository: WalletRepository, fileService: FileService);
    find({ email, phoneNumber, id }: FindUserDto): Promise<import("../entities/user.entity").default>;
    create(payload: any): Promise<boolean | import("../entities/user.entity").default>;
    resetPassword(data: any): Promise<boolean>;
    deleteAdmin(userId: any): Promise<{
        message: string;
    }>;
    updateAdminStatus(userId: any, status: any): Promise<{
        message: string;
    }>;
    updateAccount(req: any, upload: any): Promise<{
        message: string;
    }>;
    updateImage(req: any, file: any): Promise<{
        message: string;
    }>;
    favoriteProduct(user: any, productId: any): Promise<import("../entities/user_favourite.entity").default>;
    viewFavoriteProduct(user: any): Promise<{
        rows: import("../entities/user_favourite.entity").default[];
        count: number;
    }>;
    removeFavoriteProduct(user: any, productId: any): Promise<string>;
}
