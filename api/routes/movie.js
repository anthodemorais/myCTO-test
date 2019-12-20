const jwt = require('jwt-simple');
const config = require('../config/config.js');
const eJwt = require('express-jwt');
const sanitizer = require('sanitizer');

exports.default = (app, model, UserMovie, User) => {

    // returns the user's favourite movies list
    app.get('/movies/:user_id', (req, res) => {
        model.findAll({ include: [
            { model: User, where: { id: sanitizer.sanitize(req.params.user_id) } },
        ] })
        .then(movies => {
            res.status(200)
            res.json(movies);
        })
        .catch(() => {
            res.status(500)
            res.json({"Error": "Could not get user's movies"});
        })
    })
    .post('/movies/:user_id', (req, res) => {
        // adds the movie with the title passed in the body to the list of the user in the url
        let title = sanitizer.sanitize(req.body.title);
        
        // if the movie is in the database, return it, else create it and return it
        model.findOrCreate({ where: { title: title }, defaults: {} })
        .then(([movie, created]) => {
            // adds the movie to the user's favourite movies list
            UserMovie.create({
                userId: sanitizer.sanitize(req.params.user_id),
                movieId: movie.id
            })
            .then(result => {
                res.status(200)
                res.json({"Success": "Successfully added the movie to the user"});
            })
            .catch(() => {
                res.status(500)
                res.json({"Error": "Could not add the movie to the user's movie list"});
            })
        })
        .catch(() => {
            res.status(500)
            res.json({"Error": "Could not add the movie to the user's movie list"});
        })
    })
    .delete('/movies/:user_id/:movie_id', (req, res) => {
        // removes the movie from the list
        UserMovie.destroy({ where: { userId: sanitizer.sanitize(req.params.user_id), movieId: sanitizer.sanitize(req.params.movie_id)} })
        .then(() => {
            res.status(200)
            res.json({"Success": "Successfully deleted"});
        })
        .catch(() => {
            res.status(500)
            res.json({"Error": "Could not delete movie from list"});
        })
    });
    
};