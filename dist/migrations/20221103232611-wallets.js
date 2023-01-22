module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('wallets', {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
                primary: true,
                unique: true,
            },
            user_id: {
                type: Sequelize.UUID,
                allowNull: true,
            },
            user_type: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            bank_id: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            bank_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            account_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            currency: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            medium: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            account_number: {
                type: Sequelize.STRING,
                allowNull: true,
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
        await queryInterface.dropTable('wallets');
    },
};
//# sourceMappingURL=20221103232611-wallets.js.map