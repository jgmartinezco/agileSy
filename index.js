'use strict'

// Cargamos el fichero app.js con la configuración de Express
var app = require('./app');
var express = require('express');
var securityController = require('./controllers/security');

var port = process.env.PORT || 3000;


app.route('/getUser/:email').get(securityController.getUser);
app.route('/getMenu/:userCode').get(securityController.getMenu);


app.listen(port, () => console.log('server is running'));




