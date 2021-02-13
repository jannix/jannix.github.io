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
router.put("/subedit/:id", celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().allow(''),
        description: Joi.string(),
        subjectIds: Joi.array()/*.items(Joi.number)*/.required(),//TODO: fix validation array type
        editerId: Joi.number().required(),
    })
}), auth, subCtrl.updateSub);
router.delete('/:id', auth, subCtrl.deleteSub);

router.get('/getbytitle/:title', subCtrl.getByTitle);
router.get('/getbyexacttitle/:title', subCtrl.getByExactTitle);
router.get('/getbyid/:id', subCtrl.getById);

module.exports = router;
