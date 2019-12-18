const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const config = require('./config/config.js');
const { User, Movie } = require('./sequelize');

const app = express();

app.use(bodyParser.json());

require('./routes/user').default(app, con, User);
require('./routes/movie').default(app, con, Movie);

const port = 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));