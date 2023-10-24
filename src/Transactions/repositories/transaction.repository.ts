import { Injectable, Inject } from '@nestjs/common';
import { Sequelize, Op } from 'sequelize';
import { databaseProviders } from 'src/Database/providers';
import Transaction from '../entities/transaction.entity';
import PurchasedProduct from '../entities/purchased-product.entity';
import Users from 'src/Users/entities/user.entity';
import Product from 'src/Products/entities/product.entity';

const DB = databaseProviders[0].useFactory();

@Injectable()
export default class TransactionRepository {
  constructor(
    @Inject('TRANSACTION_ENTITY')
    private readonly transactionEntity: typeof Transaction,
    @Inject('PURCHASED_ENTITY')
    private readonly purchaseProductEntity: typeof PurchasedProduct,
    @Inject('USER_ENTITY')
    private readonly userEntity: typeof Users,
    @Inject('PRODUCT_ENTITY')
    private readonly productEntity: typeof Product,
  ) {}

  async deposit(
    txObject,
    { returnObj = false } = {},
  ) {
    return (await DB).transaction(async (transaction) => {
      if (returnObj) {
        return txObject;
      }

      await this.transactionEntity.create<Transaction>(txObject, {
        transaction
      });
      // TODO:
      // Notification alert for payment

      return true;
    });
  }

  async debit(txObject, { returnObj = false } = {}) {
    return (await DB).transaction(async (transaction) => {

      if (returnObj) {
        return txObject;
      }

      return this.transactionEntity.create<Transaction>(txObject, {
        transaction
      });

      // TODO:
      // Notification alert for withdrawal
    });
  }

  find(id): Promise<Transaction> {
    return this.transactionEntity.findOne<Transaction>({
      where: {
        id,
      },
    });
  }

  tranzact({
    id: userId,
    userType,
    txType,
  }): Promise<{ rows: Transaction[]; count: number }> {
    return this.transactionEntity.findAndCountAll<Transaction>({
      where: {
        txType: {
          [Op.and]: {
            [Op.in]: [txType ? txType : ['DEBIT', 'CREDIT']],
          },
        },
        [Op.or]: [
          {
            senderId: userId,
            senderType: userType,
          },
          {
            receiverId: userId,
            receiverType: userType,
          },
        ],
      },
      order: [['createdAt', 'DESC']]
    });
  }

  calculateBalance({
    userId,
    userType,
    currency = 'NGN',
    category = ['DEPOSIT', 'AIRTIME', 'TRANSFER'],
  }): Promise<Transaction> {
    category = Array.isArray(category) ? category : [category];

    return this.transactionEntity.findOne({
      where: {
        [Op.and]: [
          {
            currency,
            status: 'APPROVED',
            [Op.or]: [
              {
                senderId: userId,
                senderType: userType,
                txType: 'DEBIT',
              },
              {
                receiverId: userId,
                receiverType: userType,
                txType: 'CREDIT',
              },
            ],
            // category: { [Op.in]: category },
          },
        ],
      },
      attributes: [
        [
          Sequelize.literal(`
                SUM(CASE WHEN tx_type = 'CREDIT'
                    THEN amount
                    ELSE -1 * amount
                END)
            `),
          'walletBalance',
        ],
      ],
      raw: true,
    });
  }

  findByReference(reference) {
    return this.transactionEntity.count({
      where: {
        transactionReference: reference,
      },
    });
  }

  fetchAllPurchaseProducts(meta): Promise<{ rows: PurchasedProduct[], count: number}> {
    return this.purchaseProductEntity.findAndCountAll<PurchasedProduct>({
      include: [
        {
          model: this.userEntity,
          as: 'users',
          attributes: ['firstName', 'lastName', 'userId', 'phoneNumber', 'profilePicture']
        },
        {
          model: this.productEntity,
          as: 'products',
          // attributes: ['firstName', 'lastName', 'userId', 'phoneNumber', 'profilePicture']
        }
      ],
      order: [['createdAt', 'DESC']],
      ...meta,
    })
  }

  async modify(criteriaObj, updates) { 
    await  this.purchaseProductEntity.update<PurchasedProduct>(updates, {
      where: criteriaObj,
    });
    
  }

  findPurchasedProduct(id): Promise<PurchasedProduct> {
    return this.purchaseProductEntity.findOne<PurchasedProduct>({
      where: {
        id,
      },
    });
  }
}
