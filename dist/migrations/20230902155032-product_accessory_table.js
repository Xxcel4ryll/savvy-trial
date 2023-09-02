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
    down: async (queryInterface) => {
        await queryInterface.dropTable('product_accessories');
    },
};
//# sourceMappingURL=20230902155032-product_accessory_table.js.map