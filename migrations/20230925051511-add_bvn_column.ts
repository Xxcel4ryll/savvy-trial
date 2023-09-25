module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.addColumn('users', 'bvn', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ])
    
  },

  down: async (queryInterface) => {
    await Promise.all([
      queryInterface.removeColumn('users', 'valid_id'),
    ]);
    await Promise.all([
      queryInterface.removeColumn('users', 'bvn'),
    ]);
  },
};
