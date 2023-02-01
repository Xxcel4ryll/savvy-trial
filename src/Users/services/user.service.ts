import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import UserRepository from '../repositories/user.repository';
import PaystackRepository from '../../Paystack/repositories/paystack.repository';
import { CryptoEncrypt } from '../../Globals/providers/encrypt/index';
import { Wallet } from '../../Globals/providers/payment';
import { FindUserDto } from 'src/Authentication/dtos';
import { databaseProviders } from 'src/Database/providers';
import WalletRepository from 'src/Transactions/repositories/wallet.repository';

const sequelize = databaseProviders[0].useFactory();

@Injectable()
export class UserService {
  constructor(
    private cryptoEncrypt: CryptoEncrypt,
    private usersRepository: UserRepository,
    private paymentService: Wallet,
    private paystackRepository: PaystackRepository,
    private walletRepository: WalletRepository,
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
      const { password, userType = 'USER' } = payload;

      const [user, created] = await this.usersRepository.create({
        ...payload,
        userType,
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

  async updateAccount({ req, updateInfo }) {
    const [updated] = await this.usersRepository.modify(
      { email: req.user.email },
      updateInfo.setup,
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

    return { message: 'Account setup successfully completed' };
  }
}
