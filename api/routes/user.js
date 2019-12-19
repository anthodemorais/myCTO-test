const passwordHash = require("password-hash");
const jwt = require('jwt-simple');
const config = require('../config/config.js');
const eJwt = require('express-jwt');
const sanitizer = require('sanitizer');

exports.default = (app, model) => {

    app.get('/user/:id', (req, res) => {
        model.findAll({ where: { id: sanitizer.sanitize(req.params.id) } })
        .then(user => {
            res.json(user);
        })
    })
    app.get('/users', (req, res) => {
        model.findAll()
        .then(users => {
            res.json(users);
        })
    })
    .post('/register', (req, res) => {
        var email     = sanitizer.sanitize(req.body.email),
            password  = sanitizer.sanitize(req.body.password),
            firstname = sanitizer.sanitize(req.body.firstname),
            lastname  = sanitizer.sanitize(req.body.firstname);
    
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if (re.test(String(email).toLowerCase()) && password.length >= 6) {
            model.findAll({ where: { email: email } })
            .then(result => {
                if (!result || result.length == 0) {
                    model.create({ email, password, firstname, lastname })
                    .then(() => {
                        let token = jwt.encode(this, config.secret);
                        res.status(200);
                        res.json({token: token });
                    })
                }
                else {
                    res.status(500);
                    res.json({err: "Email already exists"});
                }
            })
        }
        else {
            res.status(500);
            res.json({err: "Email or password invalid"});
        }
    })
    .post('/login', (req, res) => {
        var email    = sanitizer.sanitize(req.body.email),
            password = sanitizer.sanitize(req.body.password);

        model.findAll({ where: { email: email } })
            .then(result => {
                if (result.length != 0) {
                    if (passwordHash.verify(password, result[0].dataValues.password)) {
                        res.status(500);
                        res.json({err: "Email or password incorrect"});
                    }
                    else {
                        let token = jwt.encode(this, config.secret);
                        res.status(200);
                        res.json({token: token, user: result[0].dataValues });
                    }
                }
                else {
                    res.status(500);
                    res.json({err: "Email or password incorrect"});
                }
            })
    })
    .delete('/user/:id', eJwt({secret: config.secret}), (req, res) => {
        model.destroy({ where: { id: sanitizer.sanitize(req.params.id) } })
        .then(() => {
            res.json({"Success": "Successfully deleted"});
        })
    });

};