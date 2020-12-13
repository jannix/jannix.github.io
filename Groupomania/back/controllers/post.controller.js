const db = require('../models');
const Post = db.posts;

exports.create = (req, res, next) => {
    const post = {
        title: req.body.title,
        text: req.body.text,
        ownerId: req.body.ownerId,
        parentId: req.body.parentId,
        upvote: 0,
        downvote: 0,
        isOC: req.body.isOC,
    };
    Post.create(post).then((post) => res.status(201).json({
        message: 'Post créé !',
        subId: post.id,
    })).catch(error => res.status(400).json({ error }));
};

