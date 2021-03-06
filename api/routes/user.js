const passwordHash = require("password-hash");
const jwt = require('jwt-simple');
const config = require('../config/config.js');
const eJwt = require('express-jwt');
const sanitizer = require('sanitizer');

exports.default = (app, model) => {

    // returns the list of users
    app.get('/users', (req, res) => {
        model.findAll()
        .then(users => {
            res.json(users);
        })
        .catch(() => {
            res.status(500)
            res.json({"Error": "Could not get users"});
        })
    })
    app.post('/users/new', (req, res) => {
        // creates a new user if there's no user with the same name
        let firstname = sanitizer.sanitize(req.body.firstname);
        let lastname = sanitizer.sanitize(req.body.lastname);
        
        model.findOrCreate({ where: { firstname, lastname }, defaults: {} })
        .then(([user, created]) => {
            res.status(200)
            res.json({"Success": "Successfully created the new user", "user": user});
        })
        .catch(() => {
            res.status(500)
            res.json({"Error": "Could not create user"});
        })
    })
    .delete('/users/:id', (req, res) => {
        // deletes the user with the id passed in the url
        model.destroy({ where: { id: sanitizer.sanitize(req.params.id) } })
        .then(() => {
            res.json({"Success": "Successfully deleted"});
        })
        .catch(() => {
            res.status(500)
            res.json({"Error": "Could not delete user"});
        })
    });

};