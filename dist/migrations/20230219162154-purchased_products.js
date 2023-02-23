module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('purchased_products', {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
                primary: true,
                unique: true,
            },
            transaction_id: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            payment_type: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            product_id: {
                type: Sequelize.DataTypes.UUID,
                references: {
                    model: 'products',
                    key: 'id',
                },
            },
            amount: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            created_at: {
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false,
            },
            updated_at: {
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                onUpdate: true,
                allowNull: false,
            },
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('purchased_products');
    },
};
//# sourceMappingURL=20230219162154-purchased_products.js.map