import { Injectable, Inject } from '@nestjs/common';
import { Sequelize, Op } from 'sequelize';
import Wallet from '../entities/wallet.entity';
import TransactionRepository from '../repositories/transaction.repository';

@Injectable()
export default class WalletRepository {
  constructor(
    @Inject('WALLET_ENTITY')
    private readonly walletEntity: typeof Wallet,
    private transaction: TransactionRepository,
  ) {}

  find(id): Promise<Wallet> {
    return this.walletEntity.findOne<Wallet>({
      where: {
        id,
      },
    });
  }

  findByUser(userId): Promise<Wallet[]> {
    return this.walletEntity.findAll<Wallet>({
      where: {
        userId,
      },
    });
  }

  create(options) {
    return this.walletEntity.findOrCreate<Wallet>({
      where: {
        [Op.or]: [
          {
            accountNumber: options.data.account_number,
            userId: options.userId,
            currency: options.data.currency,
          },
        ],
      },
      defaults: {
        accountNumber: options.data.account_number,
        accountName: options.data.account_name,
        userId: options.userId,
        userType: options.userType,
        bankId: options.data.bank.id,
        bankName: options.data.bank.name,
        currency: options.data.currency,
        medium: 'TRANSFER',
      },
      raw: true,
    });
  }

  balanceLogic({ userId, userType, currency = 'NGN' }) {
    return this.transaction.calculateBalance({ userId, userType, currency });
  }
}
