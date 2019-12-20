const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const config = require('./config/config.js');
const { User, Movie, UserMovie} = require('./sequelize');

const app = express();

app.use(bodyParser.json());
app.use(session({
	secret: config.secret,
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors())
app.options('*', cors());

require('./routes/user').default(app, User);
require('./routes/movie').default(app, Movie, UserMovie, User);

const port = 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));