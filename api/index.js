const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('./config/config.js');
const { User, Movie } = require('./sequelize');

const app = express();

app.use(bodyParser.json());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));

require('./routes/user').default(app, con, User);
require('./routes/movie').default(app, con, Movie);

const port = 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));