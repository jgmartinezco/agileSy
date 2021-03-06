'use strict'

const express = require('express');
var config = require('./config');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();

app.use('/secure', (req, res, next) => {

    if (!config.jwt.enabled) {
        next();
        return;
    }


    var token = req.headers['authorization']
    if (!token) {
        res.status(401).send({
            error: "Es necesario el token de autenticación"
        })
        return
    }

    token = token.replace('Bearer ', '');

    jwt.verify(token, config.jwt.secret, function (err, user) {
        if (err) {
            res.status(401).send({
                error: 'Token inválido'
            })
        } else {
            console.log("Token válido");
            next();
        }
    })
})


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = app;

