const db = require('../models');
const Post = db.posts;
const Sub = db.subs;

removeUserFromArray = (array, userId) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == userId) {
            array.splice(i, 1);
            break;
        }
    }
};

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
        postId: post.id,
    })).catch(error => res.status(400).json({ error }));
};

exports.changeLikes = (req, res, next) => {
    Post.findByPk(req.params.postId, {raw: true})
        .then(post => {
            if (req.body.like === 1) {
                if (!post.usersUpVote.includes(req.body.userId)) {
                    post.usersUpVote.push(req.body.userId);
                }
            } else if (req.body.like === -1) {
                if (!post.usersDownVote.includes(req.body.userId)) {
                    post.usersDownVote.push(req.body.userId);
                }
            } else if (req.body.like === 0) {
                if (post.usersUpVote.includes(req.body.userId)) {
                    removeUserFromArray(post.usersUpVote, req.body.userId);
                }
                if (post.usersDownVote.includes(req.body.userId)) {
                    removeUserFromArray(post.usersDownVote, req.body.userId);
                }
            }
            Post.update(post, { where: { id: req.params.postId } }).then(result => {
                if (result[0] === 1) {
                    res.status(200).json({
                        message: 'Likes updated.',
                        result: result
                    })
                } else {
                    res.status(500).json({ error: "Error, post couldn't be updated. Post ID : " + req.params.postId });
                }
            }).catch(err => {res.status(500).send({message: err})});
        })
        .catch(error => res.status(500).json({ error }));
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
            where: {parentId: req.params.subId,
            isOC: true},
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

