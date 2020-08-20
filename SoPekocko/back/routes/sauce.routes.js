const express = require('express');
const auth = require('../middlewares/auth.middleware');
const multer = require('../middlewares/multer-config.middleware');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce.controller');

router.post('/', auth, multer, sauceCtrl.postSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, multer, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.changeLikesSauce);

module.exports = router;
