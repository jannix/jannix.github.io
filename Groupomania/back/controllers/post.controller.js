const db = require('../models');
const Post = db.posts;
const Sub = db.subs;

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

exports.getById = (req, res, next) => {
    Post.findByPk(req.params.postId, {raw: true}).then( post => {
        if (!post) {
            return res.status(404).json({ error: 'Post inexistant !' });
        }
        res.status(200).json({postFound: post});
    }).catch(error => res.status(500).json({ error }));
};

exports.getByParentId = (req, res, next) => {
    Post.findAll({
        where: {parentId: req.params.parentId},
        raw: true
    }).then( posts => {
        if (!posts || posts.length === 0) {
            return res.status(404).json({ error: 'Posts inexistant !' });
        }
        res.status(200).json({postsFound: posts});
    }).catch(error => res.status(500).json({ error }));
};

exports.getCommentsByParentId = (req, res, next) => {
    Post.findAll({
        where: {parentId: req.params.parentId,
        isOC: false},
        raw: true
    }).then( posts => {
        if (!posts || posts.length === 0) {
            return res.status(404).json({ error: 'Posts inexistant !' });
        }
        res.status(200).json({postsFound: posts});
    }).catch(error => res.status(500).json({ error }));
};

exports.getBySubId = (req, res, next) => {
    let subTitle;
    Sub.findByPk(req.params.subId, {raw: true}).then( sub => {
        subTitle = sub.title;
        Post.findAll({
            where: {parentId: req.params.subId},
            raw: true
        }).then( posts => {
            if (!posts || posts.length === 0) {
                return res.status(404).json({ error: 'Posts inexistant !' });
            }
            posts.forEach(post => {
                post.subTitle = subTitle;
            });
            res.status(200).json({postsFound: posts});
        }).catch(error => res.status(500).json({ error }));
    }).catch(error => res.status(500).json({ error }));

};

