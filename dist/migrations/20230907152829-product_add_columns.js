module.exports = {
    up: async (queryInterface, Sequelize) => {
        await Promise.all([
            queryInterface.addColumn('products', 'main_image', {
                type: Sequelize.STRING,
                allowNull: false,
            }),
        ]);
    },
    down: async (queryInterface) => {
        await Promise.all([
            queryInterface.removeColumn('products', 'label'),
        ]);
    },
};
//# sourceMappingURL=20230907152829-product_add_columns.js.map