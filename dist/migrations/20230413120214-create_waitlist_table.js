module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('wait_list', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primary: true,
                unique: true,
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
            },
            name: {
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
        await queryInterface.dropTable('wait_list');
    },
};
//# sourceMappingURL=20230413120214-create_waitlist_table.js.map