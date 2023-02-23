"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionProviders = void 0;
const wallet_entity_1 = require("../entities/wallet.entity");
const transaction_entity_1 = require("../entities/transaction.entity");
const purchased_product_entity_1 = require("../entities/purchased-product.entity");
exports.TransactionProviders = [
    {
        provide: 'WALLET_ENTITY',
        useValue: wallet_entity_1.default,
    },
    {
        provide: 'TRANSACTION_ENTITY',
        useValue: transaction_entity_1.default,
    },
    {
        provide: 'PURCHASED_ENTITY',
        useValue: purchased_product_entity_1.default,
    },
];
//# sourceMappingURL=transaction.provider.js.map