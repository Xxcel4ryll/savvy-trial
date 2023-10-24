import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { databaseProviders } from 'src/Database/providers';
import WalletRepository from 'src/Transactions/repositories/wallet.repository';
import TransactionRepository from 'src/Transactions/repositories/transaction.repository';
import { ProductService } from 'src/Products/services/product.service';
import UserRepository from 'src/Users/repositories/user.repository';
import { PaystackService } from '../../Globals/providers/payment';

import * as _ from 'lodash';
import { Op } from 'sequelize';
import { calculate_pagination_data } from 'src/utils/helper';


const DB = databaseProviders[0].useFactory();

@Injectable()
export class TransactionService {
  constructor(
    private transactionRepository: TransactionRepository,
    private productsService: ProductService,
    private paymentService: PaystackService,
    private walletRepository: WalletRepository,
    private userRepository: UserRepository,
  ) {}

  async payment(user, payload) {
    try {
      const { id: userId, userType } = user;

      // TODO: 
      // 1. 

      const availableProducts = await this.productsService.productAvailability(payload.products);
      
      const totalAmount = availableProducts.reduce((total, item) => total + item.price, 0)
      
      return (await DB).transaction(async (transaction) => {
        if (payload.paymentMethod.toLowerCase() === 'wallet') {
          const balance = await this.walletRepository.balanceLogic({
            userId,
            userType,
          });

          console.log(balance);
          

    
          if (balance['walletBalance'] <= totalAmount) {
            const txObject = await this.debit({
              userId: user.id,
              userType: user.userType,
              category: payload.paymentType,
              currency: 'NGN',
              email: user.email,
              amount: totalAmount,
            });

            const productCharge = await this.transactionRepository.debit(txObject);
            
            // Record and update purchase products
            await this.productsService.recordPurchasedProduct({
              transactionId: productCharge.id,
              paymentType: payload.paymentType,
              userId,
              products: availableProducts,
            });

            return _.omit(productCharge.dataValues, [
              'currency',
              'txType',
              'updatedAt',
              'senderId',
              'senderType'
            ]);
          }

          throw new HttpException(
            {
              statusCode: HttpStatus.PRECONDITION_FAILED,
              name: 'WALLET',
              error: 'Insufficient wallet balance',
            },
            HttpStatus.PRECONDITION_FAILED,
          );
        }

        const { data } = await this.paymentService.cardDeposit({
          ...user,
          amount: totalAmount,
          method: payload.paymentMethod
        });
        
        return data
      });
    } catch (error: any) {
      throw error;
    }
  }

  async verify(user, payload) {
    try {
      const { data } = await this.paymentService.verifyTransaction(payload);

    } catch (error: any) {
      throw error;
    }
  }

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
      ['TRANSFER', 'WITHDRAWAL'].includes(category) &&
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

  async getPurchasedProducts(calculatedQuery,type?: string) {
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

  const orders = await this.transactionRepository.fetchAllPurchaseProducts(calculatedQuery);
    return calculate_pagination_data(orders, query_page, meta.limit)
  }

  async updateStatus(id: string, status: string) {
    const updatedStatus:string = status.toLowerCase()
    const updates = {
      status: updatedStatus
    }
    const where = {
      id: id
    }
   const updatedPrder =  await this.transactionRepository.modify(where, updates);
    

    return {
      message: `Admin updated order to ${updatedStatus}`,
    }
  }
}
