module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users_otp', {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
                primary: true,
                unique: true,
            },
            user_id: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            secret: {
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
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('users_otp');
    },
};
//# sourceMappingURL=20230613103544-users_otp_table.js.map