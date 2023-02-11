module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('product_specification', {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
                primary: true,
                unique: true,
            },
            product_id: {
                type: Sequelize.DataTypes.UUID,
                references: {
                    model: 'products',
                    key: 'id',
                },
            },
            specifications: {
                type: Sequelize.TEXT,
                allowNull: false,
            }
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('product_specification');
    },
};
//# sourceMappingURL=20230210220808-products_specifications_table.js.map