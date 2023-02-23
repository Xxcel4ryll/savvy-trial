"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../repositories/user.repository");
const paystack_repository_1 = require("../../Paystack/repositories/paystack.repository");
const index_1 = require("../../Globals/providers/encrypt/index");
const payment_1 = require("../../Globals/providers/payment");
const providers_1 = require("../../Database/providers");
const wallet_repository_1 = require("../../Transactions/repositories/wallet.repository");
const user_favorites_repository_1 = require("../repositories/user_favorites.repository");
const sequelize = providers_1.databaseProviders[0].useFactory();
let UserService = class UserService {
    constructor(cryptoEncrypt, usersRepository, userFavouriteRepository, paymentService, paystackRepository, walletRepository) {
        this.cryptoEncrypt = cryptoEncrypt;
        this.usersRepository = usersRepository;
        this.userFavouriteRepository = userFavouriteRepository;
        this.paymentService = paymentService;
        this.paystackRepository = paystackRepository;
        this.walletRepository = walletRepository;
    }
    find({ email, phoneNumber, id }) {
        if (email) {
            return this.usersRepository.findByEmail(email);
        }
        if (id) {
            return this.usersRepository.findById(id);
        }
        return this.usersRepository.findByPhone(phoneNumber);
    }
    async create(payload) {
        const transaction = (await sequelize).transaction();
        try {
            const { password, userType = 'USER', countryCode = 'NG' } = payload;
            const [user, created] = await this.usersRepository.create(Object.assign(Object.assign({}, payload), { userType,
                countryCode, password: await this.cryptoEncrypt.hashPassword(password) }));
            if (!created) {
                return created;
            }
            const { customer_code } = await this.paymentService.customer(user);
            await this.paystackRepository.create({
                customerCode: customer_code,
                userId: user.id,
            });
            const virtualWallet = await this.paymentService.generate({
                code: customer_code,
            });
            await this.walletRepository.create(Object.assign(Object.assign({}, virtualWallet), { userId: user.id, userType: user.userType }));
            return user;
        }
        catch (error) {
            (await transaction).rollback();
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.PRECONDITION_FAILED,
                name: 'UNAUTHORIZED',
                error: error.message,
            }, common_1.HttpStatus.PRECONDITION_FAILED);
        }
    }
    async resetPassword(data) {
        const [isReset] = await this.usersRepository.modify({ email: data.email }, {
            password: this.cryptoEncrypt.hashPassword(data.newPassword),
        });
        return !!isReset;
    }
    async updateAccount({ req, updateInfo }) {
        const [updated] = await this.usersRepository.modify({ email: req.user.email }, updateInfo.setup || { profilePicture: updateInfo.profilePicture });
        if (!updated) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.PRECONDITION_FAILED,
                name: 'UNAUTHORIZED',
                error: 'Account setup failed',
            }, common_1.HttpStatus.PRECONDITION_FAILED);
        }
        return {
            message: `${(updateInfo === null || updateInfo === void 0 ? void 0 : updateInfo.profilePicture) ?
                'Profile image successfully uploaded' :
                'Account setup successfully completed'}`
        };
    }
    async favoriteProduct(user, productId) {
        const [favourite] = await this.userFavouriteRepository.create({ userId: user.id, productId });
        return favourite;
    }
    viewFavoriteProduct(user) {
        return this.userFavouriteRepository.find(user.id);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [index_1.CryptoEncrypt,
        user_repository_1.default,
        user_favorites_repository_1.default,
        payment_1.PaystackService,
        paystack_repository_1.default,
        wallet_repository_1.default])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map