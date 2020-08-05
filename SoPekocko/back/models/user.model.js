const userSchema = require('../shemas/user.schema');
module.exports = mongoose.model('User', userSchema);
