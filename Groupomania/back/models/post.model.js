module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        title: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true
        },
        text: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        ownerId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        parentId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        upvote: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        downvote: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        usersUpVote: {
            type: Sequelize.ARRAY(Sequelize.INTEGER),
            allowNull: false,
            defaultValue: [],
        },
        usersDownVote: {
            type: Sequelize.ARRAY(Sequelize.INTEGER),
            allowNull: false,
            defaultValue: [],
        },
        isOC: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    });

    return Post;
};
