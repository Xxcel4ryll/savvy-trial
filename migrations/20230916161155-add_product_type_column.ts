module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.removeColumn('products', 'sales_option'),
    ]);
    await Promise.all([
      queryInterface.addColumn('products', 'product_type', {
        type: Sequelize.ENUM,
        values: ['RENT', 'BUY'],
        allowNull: false,
      }),
    ])
    
  },

  down: async (queryInterface) => {
    await Promise.all([
      queryInterface.removeColumn('products', 'product_type'),
    ]);
  },
};
