module.exports = (sequelize, Sequelize) => {
    const Login = sequelize.define("login", {
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true

        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });

    return Login;
};
