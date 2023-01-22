import { Sequelize } from 'sequelize-typescript';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const databaseConfig = require('../../core/config');
import Users from '../Users/entities/user.entity';
import UserOtp from '../Otp/entities/users-otp.entity';
import Paystack from '../Paystack/entities/paystack.entity';
import Wallet from '../Transactions/entities/wallet.entity';
import Transaction from '../Transactions/entities/transaction.entity';
import Products from '../Products/entities/product.entity';
import ProductPrices from '../Products/entities/product_price.entity';
import ProductTypes from '../Products/entities/product_type.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      let config;
      switch (databaseConfig.appEnv) {
        case 'DEVELOPMENT':
          config = databaseConfig.database;
          break;
        default:
          config = databaseConfig.database;
      }
      const sequelize = new Sequelize({
        // repositoryMode: true,
        ...config,
      });
      sequelize.addModels([
        Users,
        ProductTypes,
        Products,
        ProductPrices,
        UserOtp,
        Paystack,
        Wallet,
        Transaction,
      ]);
      return sequelize;
    },
  },
];
