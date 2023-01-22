import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { FindUserDto } from 'src/Authentication/dtos';
import { databaseProviders } from 'src/Database/providers';
import WalletRepository from 'src/Transactions/repositories/wallet.repository';
import TransactionRepository from 'src/Transactions/repositories/transaction.repository';

const sequelize = databaseProviders[0].useFactory();

@Injectable()
export class TransactionService {
  constructor(
    private transactionRepository: TransactionRepository,
    private walletRepository: WalletRepository,
  ) {}

  async wallet(user) {
    try {
      const { id: userId, userType } = user;

      const wallet = await this.walletRepository.findByUser(userId);

      if (!wallet.length) {
        throw new HttpException(
          {
            statusCode: HttpStatus.PRECONDITION_FAILED,
            name: 'WALLET',
            error: 'No wallet found',
          },
          HttpStatus.PRECONDITION_FAILED,
        );
      }

      const balance = await this.walletRepository.balanceLogic({
        userId,
        userType,
      });

      return {
        walletBalance: +balance['walletBalance'],
        wallet,
      };
    } catch (error: any) {
      throw error;
    }
  }

  async transactionWebhook(payload) {
    //   try {
    //     if (deposit.event !== 'charge.success') {
    //       return Promise.reject('Transaction not successful');
    //     }
    //     const {
    //       customer: {
    //         email: customerEmail,
    //         first_name: customerFirstName,
    //         last_name: customerLastName
    //       },
    //       reference,
    //       paidAt,
    //       fees: amount,
    //       gateway_response: status,
    //       authorization: {
    //         authorization_code: authCode,
    //         receiver_bank_account_number: receiverAccountNumber,
    //         receiver_bank: receiverBank,
    //         card_type
    //       },
    //       ...paymentDetails
    //     } = deposit.data;
    //     const transationExists = await this.depositRepository.findByReference({
    //       transactionReference: reference,
    //     });
    //     if (transationExists) {
    //       return 'transaction already exists';
    //     }
    //     const user = await this.UserRepository.findOne({ email: customerEmail });
    //     if (!user) {
    //       return Promise.reject('User does not exist')
    //     }
    //     const currency =
    //       paymentDetails.currencyCode || paymentDetails.currency || 'NGN';
    //     const transactionPayload = {
    //       customerEmail,
    //       customerFirstName,
    //       customerLastName,
    //       reference,
    //       amount: paymentDetails?.channel == 'card' ? (paymentDetails?.amount / 100) : amount,
    //       authCode,
    //       status,
    //       card_type,
    //       paidAt,
    //       receiverAccountNumber,
    //       receiverBank,
    //       currency,
    //       user,
    //       channel: paymentDetails?.channel
    //     };
    //     const txObject = await this.credit(transactionPayload);
    //     return await this.TransactionRepository.deposit(
    //       transactionPayload,
    //       txObject,
    //     );
    //   } catch (error: any) {
    //     throw error;
    //   }
  }

  async transactions(user, query) {
    try {
      return this.transactionRepository.tranzact({
        ...user,
        ...query,
      });
    } catch (error: any) {
      throw error;
    }
  }
}
