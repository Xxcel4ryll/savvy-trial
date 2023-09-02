module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('products', 'overview', {
            type: Sequelize.STRING,
            allowNull: true,
        });
    },
    down: async (queryInterface) => {
        await Promise.all([
            queryInterface.removeColumn('products', 'overview'),
        ]);
    },
};
//# sourceMappingURL=20230902142907-overview_product_column.js.map