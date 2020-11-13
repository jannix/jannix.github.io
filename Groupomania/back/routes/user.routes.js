const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const rat = require("../middlewares/limit-req.middleware");

const userCtrl = require('../controllers/user.controller');

router.post('/signin', celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required(),
            username: Joi.string().allow(''),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
        })
    }), userCtrl.signup);

router.post('/login', celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required(),
        })
    }), rat.limiter, userCtrl.login);
//TODO: create user route?
router.get('/:id', auth, userCtrl.getUserById);
module.exports = router;
