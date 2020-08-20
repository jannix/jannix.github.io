const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');
const router = express.Router();

const userCtrl = require('../controllers/user.controller');

//router.post('/signup', userCtrl.signup);
//router.post('/login', userCtrl.login);
router.post('/signup', celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required(),
        })
    }), userCtrl.signup);

router.post('/login', celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required(),
        })
    }), userCtrl.login);
module.exports = router;
