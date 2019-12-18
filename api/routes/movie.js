const jwt = require('jwt-simple');
const config = require('../config/config.js');
const eJwt = require('express-jwt');
const sanitizer = require('sanitizer');

exports.default = (app, model, UserMovie) => {

    app.get('/movies/:user_id', (req, res) => {
        model.findAll({ include: [
            { model: User, where: { id: sanitizer.sanitize(req.params.user_id) } },
        ] })
        .then(movies => {
            res.json(movies);
        })
    })
    .post('/movies/:user_id', (req, res) => {
        let title = sanitizer.sanitize(req.body.title);
        
        model.findOrCreate({ where: { title: title }, defaults: {} })
        .then(([movie, created]) => {
            UserMovie.create({
                userId: sanitizer.sanitize(req.params.user_id),
                movie: movie.id
            })
        })
    })
    .delete('/movies/:user_id', eJwt({secret: config.secret}), (req, res) => {
        model.destroy({ where: { id: sanitizer.sanitize(req.params.id) } })
        .then(() => {
            res.json({"Success": "Successfully deleted"});
        })
    });
    
};