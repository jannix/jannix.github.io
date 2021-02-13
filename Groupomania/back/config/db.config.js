const constants = require('../constants/secret-constants');

module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: constants.ADMIN_PASSWORD,
    DB: "groupomania",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
