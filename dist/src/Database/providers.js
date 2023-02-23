"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const databaseConfig = require('../../core/config');
const user_entity_1 = require("../Users/entities/user.entity");
const users_otp_entity_1 = require("../Otp/entities/users-otp.entity");
const paystack_entity_1 = require("../Paystack/entities/paystack.entity");
const wallet_entity_1 = require("../Transactions/entities/wallet.entity");
const transaction_entity_1 = require("../Transactions/entities/transaction.entity");
const product_entity_1 = require("../Products/entities/product.entity");
const product_price_entity_1 = require("../Products/entities/product_price.entity");
const product_type_entity_1 = require("../Products/entities/product_type.entity");
const product_specification_entity_1 = require("../Products/entities/product_specification.entity");
const product_images_entity_1 = require("../Products/entities/product_images.entity");
const user_favourite_entity_1 = require("../Users/entities/user_favourite.entity");
const purchased_product_entity_1 = require("../Transactions/entities/purchased-product.entity");
exports.databaseProviders = [
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
            const sequelize = new sequelize_typescript_1.Sequelize(Object.assign({}, config));
            sequelize.addModels([
                user_entity_1.default,
                product_type_entity_1.default,
                product_entity_1.default,
                product_price_entity_1.default,
                users_otp_entity_1.default,
                paystack_entity_1.default,
                wallet_entity_1.default,
                transaction_entity_1.default,
                product_specification_entity_1.default,
                product_images_entity_1.default,
                user_favourite_entity_1.default,
                purchased_product_entity_1.default
            ]);
            return sequelize;
        },
    },
];
//# sourceMappingURL=providers.js.map