module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('product_images', {
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
            image: {
                type: Sequelize.STRING,
                allowNull: false,
            }
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('product_images');
    },
};
//# sourceMappingURL=20230210220816-products_images.js.map