module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('withdrawals', {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
                primary: true,
                unique: true,
            },
            user_id: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            currency: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            status: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            receiver_number: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            network: {
                type: Sequelize.ENUM,
                values: ['MTN', '9MOBILE', 'GLO', 'AIRTEL'],
                allowNull: false,
            },
            amount_before_charge: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            amount_after_charge: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            category: {
                type: Sequelize.ENUM,
                allowNull: false,
                values: ['AIRTIME', 'DATA', 'BULK_SMS'],
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
        await queryInterface.dropTable('withdrawals');
    },
};
//# sourceMappingURL=20221115105321-withdrawal_table.js.map