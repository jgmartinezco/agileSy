'use strict'

// Cargamos el fichero app.js con la configuración de Express
var app = require('./app');

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




