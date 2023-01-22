module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('paystack_account', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primary: true,
        unique: true,
      },

      user_id: {
        type: Sequelize.UUID,
        allowNull: true,
      },

      customer_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },

      updated_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: true,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('paystack_account');
  },
};
