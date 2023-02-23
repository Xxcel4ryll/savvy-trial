module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primary: true,
        unique: true,
      },

      sender_id: {
        type: Sequelize.STRING(255),
      },

      sender_type: {
        type: Sequelize.STRING(255),
      },

      receiver_id: {
        type: Sequelize.STRING(255),
      },

      receiver_type: {
        type: Sequelize.STRING(255),
      },

      currency: {
        type: Sequelize.STRING,
      },

      transaction_reference: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },

      tx_type: {
        type: Sequelize.ENUM,
        values: ['DEBIT', 'CREDIT'],
        allowNull: false,
      },

      status: {
        type: Sequelize.ENUM,
        values: ['APPROVED', 'PENDING'],
        defaultValue: 'APPROVED',
      },

      category: {
        type: Sequelize.ENUM,
        values: ['DEPOSIT', 'TRANSFER', 'BUY', 'RENT'],
        allowNull: false,
      },

      medium: {
        type: Sequelize.ENUM,
        values: ['CARD', 'WALLET', 'BANK'],
        allowNull: false,
        defaultValue: 'WALLET',
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

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface) => {
    await queryInterface.dropTable('transactions');
  },
};
