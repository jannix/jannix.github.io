module.exports = (sequelize, Sequelize) => {
    const Login = sequelize.define("login", {
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
    });

    return Login;
};
