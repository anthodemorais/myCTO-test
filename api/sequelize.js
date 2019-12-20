const mysql = require('mysql2');
const Sequelize = require('sequelize');
const UserModel = require('./models/User');
const MovieModel = require('./models/Movie');

// edit according to your db user and db name
const sequelize = new Sequelize('mycto-test', 'root', 'root', {
    host: 'localhost',
    port: 8889,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// import and execute functions to create each model
const User = UserModel(sequelize, Sequelize)
const UserMovie = sequelize.define('user_movie', {}) // table that will represent the Many to Many relationship between users and movies
const Movie = MovieModel(sequelize, Sequelize)

// create the many to many relationship
User.belongsToMany(Movie, { through: UserMovie, unique: false })
Movie.belongsToMany(User, { through: UserMovie, unique: false })

// synchronizes sequelize with the database
sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
});

// returns the objects created
module.exports = {
    User,
    Movie,
    UserMovie
};