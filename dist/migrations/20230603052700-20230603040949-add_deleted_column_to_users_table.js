module.exports = {
    up: async (queryInterface, Sequelize) => {
        await Promise.all([
            queryInterface.addColumn('users', 'deleted_at', {
                type: Sequelize.DATE,
                defaultValue: null,
                allowNull: true,
            }),
        ]);
    },
    down: async (queryInterface) => {
        await Promise.all([
            queryInterface.removeColumn('users', 'deleted_at'),
        ]);
    }
};
//# sourceMappingURL=20230603052700-20230603040949-add_deleted_column_to_users_table.js.map