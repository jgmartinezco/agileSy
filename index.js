'use strict'

// Cargamos el fichero app.js con la configuración de Express
var app = require('./app');

var securityController = require('./controllers/security');
var reportsController = require('./controllers/reports');
var kpiController = require('./controllers/kpiManagement');

var port = process.env.PORT || 3000;


app.post('/login', securityController.login);
app.get('/secure/getUser/:email', securityController.getUser);
app.get('/secure/getMenu/:userCode', securityController.getMenu);

app.get('/secure/getReportByPeriod/:IdPeriod', reportsController.reportByPeriod);
app.get('/secure/getReportByTeamAndPeriod/:IdPeriod/:IdTeam', reportsController.reportByTeamAndPeriod);

app.get('/secure/getKPIList/:IdTeam', kpiController.getKPIList);
app.post('/secure/registerMetrics', kpiController.registerMetrics);

app.listen(port, () => console.log('server is running'));




