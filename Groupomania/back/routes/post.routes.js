const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const rat = require("../middlewares/limit-req.middleware");

const postCtrl = require('../controllers/post.controller');

router.post('/create', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string(),
        text: Joi.string(),
        ownerId: Joi.number().required(),
        parentId: Joi.number().required(),
        isOC: Joi.boolean().required(),
    })
}), auth, postCtrl.create);

router.get('/getpost/:postId', auth, postCtrl.getById);
router.get('/getposts/:subId', auth, postCtrl.getByParentId);
router.get('/getpostsbysub/:subId', auth, postCtrl.getBySubId);

module.exports = router;
