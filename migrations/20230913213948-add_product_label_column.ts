module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.addColumn('products', 'label', {
        type: Sequelize.ENUM,
        values: ['NEW', 'USED'],
        allowNull: false,
      }),
    ])
    
  },

  down: async (queryInterface) => {
    await Promise.all([
      queryInterface.removeColumn('products', 'label'),
    ]);
  },
};
