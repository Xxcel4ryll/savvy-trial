
module.exports = {
	up: async (queryInterface, Sequelize) => {
		const table = await queryInterface.describeTable('users');
        if (!table.status) {
			await Promise.all([
				queryInterface.addColumn('users', 'status', {
					type: Sequelize.ENUM,
					allowNull: false,
					values: ['SUSPENDED', 'VERIFIED', 'PENDING'],
					defaultValue: 'VERIFIED',
				}),
			]);
		}
	},

	down: async (queryInterface) => {
		await Promise.all([
			queryInterface.removeColumn('users', 'status'),
		]);
	}
};
