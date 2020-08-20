const Sauce = require('../models/sauce.model');
const fs = require('fs');

exports.postSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));

};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
}

function removePreviousPicture(sauceId) {
    Sauce.findOne({ _id: sauceId })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, (err) => {
                if (err) {
                    throw err;
                }
                console.log('Delete '+ filename + ' successful');
            });
        })
        .catch(error => {
            console.log(error);
        });
}

exports.modifySauce = (req, res, next) => {
    let sauceObject = {};
    if (req.file) {
        removePreviousPicture(req.params.id);
        sauceObject = {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            likes: 0,
            dislikes: 0,
            usersLiked: [],
            usersDisliked: []
        };
    } else {
        sauceObject = {
            ...req.body,
            likes: 0,
            dislikes: 0,
            usersLiked: [],
            usersDisliked: []
        };
    }
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

removeUserFromArray = (array, userId) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == userId) {
            array.splice(i, 1);
            break;
        }
    }
};

exports.changeLikesSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (req.body.like === 1) {
                if (!sauce.usersLiked.includes(req.body.userId)) {
                    sauce.usersLiked.push(req.body.userId);
                    sauce.likes += 1;
                }
            } else if (req.body.like === -1) {
                if (!sauce.usersDisliked.includes(req.body.userId)) {
                    sauce.usersDisliked.push(req.body.userId);
                    sauce.dislikes += 1;
                }
            } else if (req.body.like === 0) {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    removeUserFromArray(sauce.usersLiked, req.body.userId);
                    sauce.likes -= 1;
                }
                if (sauce.usersDisliked.includes(req.body.userId)) {
                    removeUserFromArray(sauce.usersDisliked, req.body.userId);
                    sauce.dislikes -= 1;
                }
            }
            sauce.save()
                .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

