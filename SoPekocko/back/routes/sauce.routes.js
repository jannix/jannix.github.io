const express = require('express');
const auth = require('../middlewares/auth.middleware');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce.controller');

router.post('/', auth, sauceCtrl.postSauce);
//router.post('/login', userCtrl.login);

module.exports = router;
