const express = require('express');
const db = require("./models");
const bodyParser = require('body-parser');
const cors = require("cors");
const helmet = require("helmet");
const userRoutes = require('./routes/user.routes');
const subRoutes = require('./routes/sub.routes');
const postRoutes = require('./routes/post.routes');
//const secretConst = require('./constants/secret-constants');
const path = require('path');

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/user', userRoutes);
app.use('/api/sub', subRoutes);
app.use('/api/post', postRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Groupomania Social Platfrom." });
});

app.use((req, res) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
});

db.sequelize.sync({ alter: true }).then(() => {
    console.log("Drop and re-sync db.");
}); //{ force: true }only for dev to drop tables

module.exports = app;
