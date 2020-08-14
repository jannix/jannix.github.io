const sauceSchema = require('../shemas/sauce.schema');
const mongoose = require('mongoose');

module.exports = mongoose.model('Sauce', sauceSchema);
