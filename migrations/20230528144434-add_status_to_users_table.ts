module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      status: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['SUSPENDED', 'VERIFIED', 'PENDING'],
        defaultValue: 'VERIFIED',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('users', 'status');
  },
};
