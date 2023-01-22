import { Injectable, Inject } from '@nestjs/common';
import { Sequelize, Op } from 'sequelize';
import Transaction from '../entities/transaction.entity';

@Injectable()
export default class TransactionRepository {
  constructor(
    @Inject('TRANSACTION_ENTITY')
    private readonly transactionEntity: typeof Transaction,
  ) {}

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
    });
  }

  // create(options) {
  // }

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
}
