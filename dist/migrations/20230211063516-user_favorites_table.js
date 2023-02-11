module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('user_favourites', {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
                primary: true,
                unique: true,
            },
            product_id: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.UUID,
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
        await queryInterface.dropTable('user_favourites');
    },
};
//# sourceMappingURL=20230211063516-user_favorites_table.js.map