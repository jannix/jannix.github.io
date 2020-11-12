module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
            type: Sequelize.STRING,
            allowNull: true
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        jobId: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        karma: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        about: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        birthdate: {
            type: Sequelize.DATEONLY,
            allowNull: true,
        },
        login : {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true
        }
    });

    return User;
};
