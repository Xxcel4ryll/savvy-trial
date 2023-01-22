module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('deposits', {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
                primary: true,
                unique: true,
            },
            transaction_reference: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            currency: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            amount: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            payment_method: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            customer_email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            customer_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            account_number: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            bank_name: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('deposits');
    },
};
//# sourceMappingURL=20221115105310-deposits_table.js.map