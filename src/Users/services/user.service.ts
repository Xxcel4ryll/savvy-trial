import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import UserRepository from '../repositories/user.repository';
import PaystackRepository from '../../Paystack/repositories/paystack.repository';
import { CryptoEncrypt } from '../../Globals/providers/encrypt/index';
import { PaystackService } from '../../Globals/providers/payment';
import { FindUserDto } from 'src/Authentication/dtos';
import { databaseProviders } from 'src/Database/providers';
import WalletRepository from 'src/Transactions/repositories/wallet.repository';
import UserFavoritesRepository from '../repositories/user_favorites.repository';
import { FileService } from 'src/Files/services/file.service';
import { calculate_pagination_data } from 'src/utils/helper';

const sequelize = databaseProviders[0].useFactory();

@Injectable()
export class UserService {
  constructor(
    private cryptoEncrypt: CryptoEncrypt,
    private usersRepository: UserRepository,
    private userFavouriteRepository: UserFavoritesRepository,
    private paymentService: PaystackService,
    private paystackRepository: PaystackRepository,
    private walletRepository: WalletRepository,
    private fileService: FileService,

  ) {}

  find({ email, phoneNumber, id }: FindUserDto) {
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
      
      const [user, created] = await this.usersRepository.create({
        ...payload,
        userType,
        countryCode,
        password: await this.cryptoEncrypt.hashPassword(password),
      });
      
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

      await this.walletRepository.create({
        ...virtualWallet,
        userId: user.id,
        userType: user.userType,
      });

      return user;
    } catch (error) {
      (await transaction).rollback();
      throw new HttpException(
        {
          statusCode: HttpStatus.PRECONDITION_FAILED,
          name: 'UNAUTHORIZED',
          error: error.message,
        },
        HttpStatus.PRECONDITION_FAILED,
      );
    }
  }

  async resetPassword(data) {
    const [isReset] = await this.usersRepository.modify(
      { email: data.email },
      {
        password: this.cryptoEncrypt.hashPassword(data.newPassword),
      },
    );

    return !!isReset;
  }

  async updatePassword(data, passwordInfo) {
    const [isReset] = await this.usersRepository.modify(
      { email: data.user.email },
      {
        password: this.cryptoEncrypt.hashPassword(passwordInfo.newPassword),
      },
    );

    if (!isReset) {
      throw new HttpException(
        {
          statusCode: HttpStatus.PRECONDITION_FAILED,
          name: 'UNAUTHORIZED',
          error: 'Password update failed',
        },
        HttpStatus.PRECONDITION_FAILED,
      );
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
    }
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
    }
  }

  async updateAccount(req, upload) {
    const [updated] = await this.usersRepository.modify(
      { email: req.user.email },
      upload.setup || 
      { profilePicture: upload.secure_url },
    );
      
    if (!updated) {
      throw new HttpException(
        {
          statusCode: HttpStatus.PRECONDITION_FAILED,
          name: 'UNAUTHORIZED',
          error: 'Account setup failed',
        },
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    return { 
      message: `${
        upload?.resource_type ? 
        'Profile image successfully uploaded' : 
        'Account setup successfully completed'
      }` 
    };
  }

  async updateProfile(req,file, upload) { 

            
      if (file.bvn && file.id) {
        let bvnFile = file.bvn[0];
        let idFile = file.id[0];
        var uploadedBvn = await this.fileService.handleUploadedFile(bvnFile);
        var uploadedId = await this.fileService.handleUploadedFile(idFile);
      }else if (file.bvn) {
        let bvnFile = file.bvn[0];  
        var uploadedBvn = await this.fileService.handleUploadedFile(bvnFile);
      }else if (file.id) {
        let idFile = file.id[0];
        var uploadedId = await this.fileService.handleUploadedFile(idFile);
      }
      if (uploadedBvn != null && uploadedId != null) {
        upload.setup.validId = uploadedId.url;
      upload.setup.bvn = uploadedBvn.url;
      }else if (uploadedBvn) {
        upload.setup.bvn = uploadedBvn.url;
      }else if (uploadedId) {
        upload.setup.validId = uploadedId.url;
      }

    const [ update ] = await this.usersRepository.modify(
      { email: req.user.email },
      upload.setup
    );

    if (!update
      ) {
      throw new HttpException(
        {
          statusCode: HttpStatus.PRECONDITION_FAILED,
          name: 'UNAUTHORIZED',
          error: 'Account setup failed',
        },
        HttpStatus.PRECONDITION_FAILED,
      );
    }
    return {
      message: "Account Profile completed succesfuly."
    }
  }

  async updateUserProfile(req, upload) {
    if (upload.password) {
      upload.password = this.cryptoEncrypt.hashPassword(upload.password);
    };

    const [updated] = await this.usersRepository.modify(
      { email: req?.user?.email },
      upload,
    );
      
    if (!updated) {
      throw new HttpException(
        {
          statusCode: HttpStatus.PRECONDITION_FAILED,
          name: 'UNAUTHORIZED',
          error: 'Profile update failed',
        },
        HttpStatus.PRECONDITION_FAILED,
      );
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
    const [favourite] = await this.userFavouriteRepository.create(
      { userId: user.id, productId }
    );
    return favourite;
  }

  viewFavoriteProduct(user) {
    return this.userFavouriteRepository.find(user.id);
  }

  getUsers(type) {
    return this.usersRepository.getUsers(type);
  }

  async createAdminUser(admin) {
    const [user, created] = await this.usersRepository.create({
      ...admin,
      userType: 'ADMIN',
      password: this.cryptoEncrypt.hashPassword(admin.password),
    });

    if (!created) {
      throw new HttpException(
        {
          statusCode: HttpStatus.PRECONDITION_FAILED,
          name: 'USER',
          error: 'Admin user already exist',
        },
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    return user;
  }

  async removeFavoriteProduct(user, productId) {
    const isRemoved = await this.userFavouriteRepository.remove({
      userId: user.id,
      productId
    });

    if(isRemoved) return 'Favorite successfully removed';

    throw new HttpException(
      {
        statusCode: HttpStatus.PRECONDITION_FAILED,
        name: 'FAVORITE',
        error: 'Favorite failed to delete',
      },
      HttpStatus.PRECONDITION_FAILED,
    );
  }

  async allUsers(calculatedQuery,type?: string) {
    const { limit_query, offset_query, query_page, condition, searchParam } =
    calculatedQuery;
  const where: { type?: string } = {};

  const meta = {
    limit: limit_query,
    offset: offset_query,
  };

  if (Object.keys(condition).length) {
    const key = Object.keys(condition)[0];
    where[key] = searchParam;
  }
  const users = await this.usersRepository.fetchAlUsers(calculatedQuery,type)
    return calculate_pagination_data(users, query_page, meta.limit)
  }

  async allKYCUSers(calculatedQuery,type?: string) {
    const { limit_query, offset_query, query_page, condition, searchParam } =
    calculatedQuery;
  const where: { type?: string } = {};

  const meta = {
    limit: limit_query,
    offset: offset_query,
  };

  if (Object.keys(condition).length) {
    const key = Object.keys(condition)[0];
    where[key] = searchParam;
  }
  const users = await this.usersRepository.fetchKycUsers(calculatedQuery)
    return calculate_pagination_data(users, query_page, meta.limit)
  }
}
