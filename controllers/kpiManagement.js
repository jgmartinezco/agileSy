'use strict'

var config = require('../config.json');
var sql = require('mssql');


module.exports.getKPIList = function (request, response, next) {

    var lIdTeam = request.params.team;
    console.log("obtener métricas a gestionar el equipo: " + lIdTeam);


    sql.connect(config.DataBase, function (err) {
        if (err) {
            console.log(err);
            response.send("error al conectarse");
        }
        else {
            var lQuery = new sql.Request();
            lQuery.input("CodEquipo", sql.SmallInt, lIdTeam);
            lQuery.execute("traerMetricasAGestionar", (err, result) => {
                console.log(err);
                if (result && result.recordset) {

                }
            });
        }
    });

    response.send("Se finalizó el método getKPIList");
}

module.exports.registerMetrics = function (request, response, next) {
    var lMetrics = request.params.metrics;
    console.log("Se solicitó registrar las siguientes métricas: " + lMetrics);
    response.send("Se finalizó el método registerMetrics");
}
