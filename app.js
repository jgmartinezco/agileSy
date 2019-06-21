'use strict'

const express = require('express');
var config = require('./config.json');
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

//module.exports = app;

var securityController = require('./controllers/security');
var reportsController = require('./controllers/reports');
var kpiController = require('./controllers/kpiManagement');

var port = process.env.PORT || 3000;


app.post('/login', securityController.login);
app.get('/secure/getUser/:email', securityController.getUser);
app.get('/secure/getMenu/:RoleId', securityController.getMenu);

app.get('/secure/getReportByPeriod/:PeriodId', reportsController.reportByPeriod);
app.get('/secure/getReportByTeamAndPeriod/:PeriodId/:TeamId', reportsController.reportByTeamAndPeriod);

app.get('/secure/getKPIList/:TeamId', kpiController.getKPIList);
app.post('/secure/registerMetrics', kpiController.registerMetrics);

app.listen(port, () => console.log('server is running'));

