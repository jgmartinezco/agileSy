'use strict'

var config = require('../config.json');
var sql = require('mssql');


module.exports.reportByTeamAndPeriod = function (request, response, next) {
    var lIdTeam = request.params.IdTeam;
    var lIdPeriod = request.params.IdPeriod;
    console.log("Se solicitó el reporte para el Equipo: " + lIdTeam + " y Periodo:" + lIdPeriod);
    response.send("Se finalizó el método reportByTeamAndPeriod");
}


module.exports.reportByPeriod = function (request, response, next) {
    var lIdPeriod = request.params.IdPeriod;
    console.log("Se solicitó el reporte para el Período: " + lIdPeriod);
    response.send("Se finalizó el método reportByPeriod");
}