const Sequelize = require('sequelize')

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
})

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
})

module.exports = {
    User,
    Movie
}