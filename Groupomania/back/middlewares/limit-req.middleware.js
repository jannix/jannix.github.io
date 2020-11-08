const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 30 * 60 * 1000,
    max: 300,//TODO: put back to 5
    message: "Too many accounts connexion from this IP, please try again later",
});

module.exports = { limiter };
