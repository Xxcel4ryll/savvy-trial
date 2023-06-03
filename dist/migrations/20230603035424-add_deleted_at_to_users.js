module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            deleted_at: {
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false,
            },
        });
    },
    down: async (queryInterface) => {
        await queryInterface.removeColumn('users', 'deleted_at');
    },
};
//# sourceMappingURL=20230603035424-add_deleted_at_to_users.js.map