module.exports = (sequelize, Sequelize) => {
    const Sub = sequelize.define("sub", {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        ownerId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        subjectIds: {
            type: Sequelize.ARRAY(Sequelize.INTEGER),
            allowNull: false,
        },
    });

    return Sub;
};
