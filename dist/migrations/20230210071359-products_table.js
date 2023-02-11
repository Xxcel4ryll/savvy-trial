module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('products', {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
                primary: true,
                unique: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            brand: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            is_visible: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            sales_option: {
                type: Sequelize.ENUM,
                allowNull: false,
                values: ['RENT', 'BUY'],
            },
            product_type_id: {
                type: Sequelize.DataTypes.UUID,
                references: {
                    model: 'product_types',
                    key: 'id',
                },
            },
            price: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
                defaultValue: 0,
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
        await queryInterface.dropTable('products');
    },
};
//# sourceMappingURL=20230210071359-products_table.js.map