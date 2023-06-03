
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await Promise.all([
			queryInterface.addColumn('users', 'status', {
				type: Sequelize.ENUM,
				allowNull: false,
        values: ['SUSPENDED', 'VERIFIED', 'PENDING'],
        defaultValue: 'VERIFIED',
			}),

      queryInterface.addColumn('users', 'deleted_at', {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
				allowNull: false,
			}),
		]);
	},

	down: async (queryInterface) => {
		await Promise.all([
			queryInterface.removeColumn('users', 'status'),

			queryInterface.removeColumn('users', 'deleted_at'),
		]);
	}
};
