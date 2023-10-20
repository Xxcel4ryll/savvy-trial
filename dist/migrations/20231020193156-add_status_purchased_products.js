module.exports = {
    up: async (queryInterface, Sequelize) => {
        await Promise.all([
            queryInterface.addColumn('purchased_products', 'status', {
                type: Sequelize.ENUM,
                values: ['confirmed', 'shipped', 'processing'],
                defaultValue: 'processing',
                allowNull: false,
            }),
        ]);
    },
    down: async (queryInterface) => {
        await Promise.all([
            queryInterface.removeColumn('purchased_products', 'status'),
        ]);
    },
};
//# sourceMappingURL=20231020193156-add_status_purchased_products.js.map