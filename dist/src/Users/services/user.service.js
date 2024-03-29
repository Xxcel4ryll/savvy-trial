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
const file_service_1 = require("../../Files/services/file.service");
const helper_1 = require("../../utils/helper");
const sequelize = providers_1.databaseProviders[0].useFactory();
let UserService = class UserService {
    constructor(cryptoEncrypt, usersRepository, userFavouriteRepository, paymentService, paystackRepository, walletRepository, fileService) {
        this.cryptoEncrypt = cryptoEncrypt;
        this.usersRepository = usersRepository;
        this.userFavouriteRepository = userFavouriteRepository;
        this.paymentService = paymentService;
        this.paystackRepository = paystackRepository;
        this.walletRepository = walletRepository;
        this.fileService = fileService;
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
    async updatePassword(data, passwordInfo) {
        const [isReset] = await this.usersRepository.modify({ email: data.user.email }, {
            password: this.cryptoEncrypt.hashPassword(passwordInfo.newPassword),
        });
        if (!isReset) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.PRECONDITION_FAILED,
                name: 'UNAUTHORIZED',
                error: 'Password update failed',
            }, common_1.HttpStatus.PRECONDITION_FAILED);
        }
        return {
            message: 'Password successfully updated'
        };
    }
    async deleteAdmin(userId) {
        await this.usersRepository.delete({
            id: userId
        });
        return {
            message: "Admin user successfully deleted"
        };
    }
    async updateAdminStatus(userId, status) {
        const updateStatus = status === 'suspend' ?
            'SUSPENDED'
            : status === 'verify' ?
                'VERIFIED' : 'PENDING';
        await this.usersRepository.modify({
            id: userId
        }, {
            status: updateStatus
        });
        return {
            message: `Admin user successfully ${updateStatus.toLocaleLowerCase()}`
        };
    }
    async updateAccount(req, upload) {
        const [updated] = await this.usersRepository.modify({ email: req.user.email }, upload.setup ||
            { profilePicture: upload.secure_url });
        if (!updated) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.PRECONDITION_FAILED,
                name: 'UNAUTHORIZED',
                error: 'Account setup failed',
            }, common_1.HttpStatus.PRECONDITION_FAILED);
        }
        return {
            message: `${(upload === null || upload === void 0 ? void 0 : upload.resource_type) ?
                'Profile image successfully uploaded' :
                'Account setup successfully completed'}`
        };
    }
    async updateProfile(req, file, upload) {
        if (file.bvn && file.id) {
            let bvnFile = file.bvn[0];
            let idFile = file.id[0];
            var uploadedBvn = await this.fileService.handleUploadedFile(bvnFile);
            var uploadedId = await this.fileService.handleUploadedFile(idFile);
        }
        else if (file.bvn) {
            let bvnFile = file.bvn[0];
            var uploadedBvn = await this.fileService.handleUploadedFile(bvnFile);
        }
        else if (file.id) {
            let idFile = file.id[0];
            var uploadedId = await this.fileService.handleUploadedFile(idFile);
        }
        if (uploadedBvn != null && uploadedId != null) {
            upload.setup.validId = uploadedId.url;
            upload.setup.bvn = uploadedBvn.url;
        }
        else if (uploadedBvn) {
            upload.setup.bvn = uploadedBvn.url;
        }
        else if (uploadedId) {
            upload.setup.validId = uploadedId.url;
        }
        const [update] = await this.usersRepository.modify({ email: req.user.email }, upload.setup);
        if (!update) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.PRECONDITION_FAILED,
                name: 'UNAUTHORIZED',
                error: 'Account setup failed',
            }, common_1.HttpStatus.PRECONDITION_FAILED);
        }
        return {
            message: "Account Profile completed succesfuly."
        };
    }
    async updateUserProfile(req, upload) {
        var _a;
        if (upload.password) {
            upload.password = this.cryptoEncrypt.hashPassword(upload.password);
        }
        ;
        const [updated] = await this.usersRepository.modify({ email: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.email }, upload);
        if (!updated) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.PRECONDITION_FAILED,
                name: 'UNAUTHORIZED',
                error: 'Profile update failed',
            }, common_1.HttpStatus.PRECONDITION_FAILED);
        }
        return {
            message: 'Profile successfully updated'
        };
    }
    async updateImage(req, file) {
        const uploadedImage = await this.fileService.handleUploadedFile(file);
        return this.updateAccount(req, uploadedImage);
    }
    async favoriteProduct(user, productId) {
        const [favourite] = await this.userFavouriteRepository.create({ userId: user.id, productId });
        return favourite;
    }
    viewFavoriteProduct(user) {
        return this.userFavouriteRepository.find(user.id);
    }
    getUsers(type) {
        return this.usersRepository.getUsers(type);
    }
    async createAdminUser(admin) {
        const [user, created] = await this.usersRepository.create(Object.assign(Object.assign({}, admin), { userType: 'ADMIN', password: this.cryptoEncrypt.hashPassword(admin.password) }));
        if (!created) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.PRECONDITION_FAILED,
                name: 'USER',
                error: 'Admin user already exist',
            }, common_1.HttpStatus.PRECONDITION_FAILED);
        }
        return user;
    }
    async removeFavoriteProduct(user, productId) {
        const isRemoved = await this.userFavouriteRepository.remove({
            userId: user.id,
            productId
        });
        if (isRemoved)
            return 'Favorite successfully removed';
        throw new common_1.HttpException({
            statusCode: common_1.HttpStatus.PRECONDITION_FAILED,
            name: 'FAVORITE',
            error: 'Favorite failed to delete',
        }, common_1.HttpStatus.PRECONDITION_FAILED);
    }
    async allUsers(calculatedQuery, type) {
        const { limit_query, offset_query, query_page, condition, searchParam } = calculatedQuery;
        const where = {};
        const meta = {
            limit: limit_query,
            offset: offset_query,
        };
        if (Object.keys(condition).length) {
            const key = Object.keys(condition)[0];
            where[key] = searchParam;
        }
        const users = await this.usersRepository.fetchAlUsers(calculatedQuery, type);
        return (0, helper_1.calculate_pagination_data)(users, query_page, meta.limit);
    }
    async allKYCUSers(calculatedQuery, type) {
        const { limit_query, offset_query, query_page, condition, searchParam } = calculatedQuery;
        const where = {};
        const meta = {
            limit: limit_query,
            offset: offset_query,
        };
        if (Object.keys(condition).length) {
            const key = Object.keys(condition)[0];
            where[key] = searchParam;
        }
        const users = await this.usersRepository.fetchKycUsers(calculatedQuery);
        return (0, helper_1.calculate_pagination_data)(users, query_page, meta.limit);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [index_1.CryptoEncrypt,
        user_repository_1.default,
        user_favorites_repository_1.default,
        payment_1.PaystackService,
        paystack_repository_1.default,
        wallet_repository_1.default,
        file_service_1.FileService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map