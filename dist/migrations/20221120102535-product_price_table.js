module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('product_prices', {
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
            price: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('product_prices');
    },
};
//# sourceMappingURL=20221120102535-product_price_table.js.map