module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_accessories', {
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
      accessories: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface) => {
    await queryInterface.dropTable('product_accessories');
  },
};
