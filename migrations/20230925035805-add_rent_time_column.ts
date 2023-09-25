module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.addColumn('products', 'rent_start_time', {
        type: Sequelize.DATE,
        allowNull: true,
      }),
    ]),
    await Promise.all([
      queryInterface.addColumn('products', 'rent_end_time', {
        type: Sequelize.DATE,
        allowNull: true,
      }),
    ])
    
  },

  down: async (queryInterface) => {
    await Promise.all([
      queryInterface.removeColumn('products', 'rent_start_time'),
    ]);
    await Promise.all([
      queryInterface.removeColumn('products', 'rent_end_time'),
    ]);
  },
};
