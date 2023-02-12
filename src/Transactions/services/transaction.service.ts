import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { FindUserDto } from 'src/Authentication/dtos';
import { databaseProviders } from 'src/Database/providers';
import WalletRepository from 'src/Transactions/repositories/wallet.repository';
import TransactionRepository from 'src/Transactions/repositories/transaction.repository';
import UserRepository from 'src/Users/repositories/user.repository';

const sequelize = databaseProviders[0].useFactory();

@Injectable()
export class TransactionService {
  constructor(
    private transactionRepository: TransactionRepository,
    private walletRepository: WalletRepository,
    private userRepository: UserRepository,
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

  async transactionWebhook(deposit) {
      try {
        if (deposit.event !== 'charge.success') {
          return Promise.reject('Transaction not successful');
        }
        const {
          customer: {
            email: customerEmail,
            first_name: customerFirstName,
            last_name: customerLastName
          },
          reference,
          paidAt,
          fees: amount,
          gateway_response: status,
          authorization: {
            authorization_code: authCode,
            receiver_bank_account_number: receiverAccountNumber,
            receiver_bank: receiverBank,
            card_type
          },
          ...paymentDetails
        } = deposit.data;
        console.log(deposit.data);
        
        const transationExists = await this.transactionRepository.findByReference(reference);
        if (transationExists) {
          return 'transaction already exists';
        }
        const user = await this.userRepository.findByEmail(customerEmail);
        if (!user) {
          return Promise.reject('User does not exist')
        }
        const currency =
          paymentDetails.currencyCode || paymentDetails.currency || 'NGN';
        const transactionPayload = {
          customerEmail,
          customerFirstName,
          customerLastName,
          reference,
          amount: paymentDetails?.channel == 'card' ? (paymentDetails?.amount / 100) : amount,
          authCode,
          status,
          card_type,
          paidAt,
          receiverAccountNumber,
          receiverBank,
          currency,
          user,
          channel: paymentDetails?.channel
        };
        const txObject = await this.credit(transactionPayload);
        return await this.transactionRepository.deposit(
          txObject,
        );
      } catch (error: any) {
        throw error;
      }
  }

  async credit(transactionDetails) {
    return await this.buildTransactionObject({
      txType: 'CREDIT',
      receiverId: transactionDetails.user.id,
      receiverType: transactionDetails.user.userType,
      category: transactionDetails.category || 'DEPOSIT',
      currency: transactionDetails.currency || 'NG',
      email: transactionDetails.user.email,
      amount: transactionDetails.amount,
      status: 'APPROVED',
      medium: transactionDetails.channel ? 'CARD' : 'TRANSFER',
    });
  }

  async debit(transactionDetails) {
    return await this.buildTransactionObject({
      ...transactionDetails,
      txType: 'DEBIT',
      senderId: transactionDetails.userId,
      senderType: transactionDetails.userType,
      category: transactionDetails.category,
      email: transactionDetails.email,
      amount: transactionDetails.amount,
    });
  }

  buildTransactionObject(transactionObject) {
    if (!transactionObject.currency || !transactionObject.category) {
      throw new Error(
        'Cannot create a transaction without category or currency',
      );
    }

    const { category, receiverId, receiverType, senderId, senderType } =
      transactionObject;

    if (
      ['TRANSFER', 'RENT', 'WITHDRAWAL'].includes(category) &&
      [receiverId, receiverType, senderId, senderType].some((elem) => !elem)
    ) {
      throw new Error(
        `Cannot handle a ${category} transaction without receiverId, receiverType, senderId or senderType set`,
      );
    }
    return {
      ...transactionObject,
      amount: this.roundUp(transactionObject.amount)
    };
  }

  roundUp(number) {
    return Number(number).toFixed(2);
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
