const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const rat = require("../middlewares/limit-req.middleware");

const subCtrl = require('../controllers/sub.controller');

router.post('/create', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        ownerId: Joi.number().required(),
        subjectIds: Joi.array()/*.items(Joi.number)*/.required(),//TODO: fix validation array type
    })
}), auth, subCtrl.create);

router.get('/getbytitle/:title', subCtrl.getByTitle);
/*
router.post('/auth/login', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    })
}), rat.limiter, userCtrl.login);


router.put("/useredit/:id", celebrate({
    [Segments.BODY]: Joi.object().keys({
        username: Joi.string().allow(''),
        firstName: Joi.string().allow(null),
        lastName: Joi.string().allow(null),
        jobId: Joi.number().allow(0),
        about: Joi.string().allow(''),
        birthdate: Joi.date().allow(null),
    })
}), auth, userCtrl.updateUserInfo);

router.put("/emailedit/:id", celebrate({
    [Segments.BODY]: Joi.object().keys({
        newEmail: Joi.string().required(),
        password: Joi.string().required(),
    })
}), auth, userCtrl.updateUserEmail);

router.put("/passwordedit/:id", celebrate({
    [Segments.BODY]: Joi.object().keys({
        password: Joi.string().required(),
        newPassword: Joi.string().required(),
    })
}), auth, userCtrl.updateUserPassword);

router.get('/:id', userCtrl.getUserById);
*/

module.exports = router;
