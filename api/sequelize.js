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

const User = UserModel(sequelize, Sequelize)
const UserMovie = sequelize.define('user_movie', {})
const Movie = MovieModel(sequelize, Sequelize)

User.belongsToMany(Movie, { through: UserMovie, unique: false })
Movie.belongsToMany(User, { through: UserMovie, unique: false })

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
});

module.exports = {
    User,
    Movie
};