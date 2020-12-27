const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const rat = require("../middlewares/limit-req.middleware");

const userCtrl = require('../controllers/user.controller');

router.post('/auth/signin', celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required(),
            username: Joi.string().allow(''),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
        })
    }), userCtrl.signup);

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

router.put("/joinsub/:id", celebrate({
    [Segments.BODY]: Joi.object().keys({
        subId: Joi.number().required(),
    })
}), auth, userCtrl.joinSub);

router.put("/quitsub/:id", celebrate({
    [Segments.BODY]: Joi.object().keys({
        subId: Joi.number().required(),
    })
}), auth, userCtrl.quitSub);

router.get('/:id', userCtrl.getUserById);

router.get('/getsubscriptions/:id', userCtrl.getUserSubscriptions);


module.exports = router;
