const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');
const auth = require('../middlewares/auth.middleware');
const multer = require('../middlewares/multer-config.middleware');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce.controller');

/*router.post('/', celebrate({
    [Segments.BODY]: Joi.object().keys({
        userId: Joi.string().required(),
        name: Joi.string().required(),
        manufacturer: Joi.string().required(),
        description: Joi.string().required(),
        mainPepper: Joi.string().required(),
        imageUrl: Joi.string().required(),
        heat: Joi.number().required(),
        likes: Joi.number().required(),
        dislikes: Joi.number().required(),
    })
}), auth, multer, sauceCtrl.postSauce);*/
router.post('/', auth, multer, sauceCtrl.postSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, multer, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.changeLikesSauce);

module.exports = router;
