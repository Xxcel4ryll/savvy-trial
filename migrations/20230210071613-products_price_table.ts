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

      price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
    });
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface) => {
    await queryInterface.dropTable('product_prices');
  },
};
