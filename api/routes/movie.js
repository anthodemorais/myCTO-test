const jwt = require('jwt-simple');
const config = require('../config/config.js');
const eJwt = require('express-jwt');
const sanitizer = require('sanitizer');

exports.default = (app, model, UserMovie, User) => {

    app.get('/movies/:user_id', (req, res) => {
        model.findAll({ include: [
            { model: User, where: { id: sanitizer.sanitize(req.params.user_id) } },
        ] })
        .then(movies => {
            res.status(200)
            res.json(movies);
        })
    })
    .post('/movies/:user_id', (req, res) => {
        let title = sanitizer.sanitize(req.body.title);
        
        model.findOrCreate({ where: { title: title }, defaults: {} })
        .then(([movie, created]) => {
            UserMovie.create({
                userId: sanitizer.sanitize(req.params.user_id),
                movieId: movie.id
            })
            .then(result => {
                res.status(200)
                res.json({"Success": "Successfully added the movie to the user"});
            })
        })
    })
    .delete('/movies/:user_id', (req, res) => {
        model.destroy({ where: { id: sanitizer.sanitize(req.params.id) } })
        .then(() => {
            res.status(200)
            res.json({"Success": "Successfully deleted"});
        })
    });
    
};