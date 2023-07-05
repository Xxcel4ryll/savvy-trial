module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primary: true,
                unique: true,
            },
            user_id: {
                type: Sequelize.UUID,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
                unique: true,
            },
            first_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            last_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            country_code: {
                type: Sequelize.STRING,
                defaultValue: 'NG',
                allowNull: false,
            },
            profile_picture: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            matric_no: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            valid_id: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            status: {
                type: Sequelize.ENUM,
                allowNull: false,
                values: ['SUSPENDED', 'VERIFIED', 'PENDING'],
                defaultValue: 'VERIFIED',
            },
            income: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            school_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            nature_of_business: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            role_in_company: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            registration_no: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            company_location: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            home_address: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
            },
            phone_number: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            user_type: {
                type: Sequelize.ENUM,
                allowNull: false,
                values: ['USER', 'ADMIN'],
                defaultValue: 'USER',
            },
            city: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            state: {
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
            deleted_at: {
                type: Sequelize.DATE,
                allowNull: true,
            },
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('users');
    },
};
//# sourceMappingURL=20221030031252-users_table.js.map