const userSchema = require('../shemas/user.schema');
const mongoose = require('mongoose');

module.exports = mongoose.model('User', userSchema);
