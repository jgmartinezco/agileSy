'use strict'

var config = require('../config');
var sql = require('mssql');


module.exports.getKPIList = function (request, response, next) {

    var lTeamId = request.params.TeamId;
    console.log("obtener métricas a gestionar el equipo: " + lTeamId);


    sql.connect(config.DataBase, function (err) {
        if (err) {
            console.log(err);
            response.send("error al conectarse");
        }
        else {
            var lQuery = new sql.Request();
            lQuery.input("CodEquipo", sql.SmallInt, lTeamId);
            lQuery.execute("traerMetricasAGestionar", (err, result) => {
                console.log(err);
                if (result && result.recordset) {
                    response.send({ result: result.recordset });
                }
                else {
                    response.status(404).send({ error: "No existen métricas para el equipo" });
                }
                sql.close();
            });
        }
    });
}

module.exports.registerMetrics = function (request, response, next) {
    var lMetrics = request.params.metrics;
    console.log("Se solicitó registrar las siguientes métricas: " + lMetrics);
    response.send("Se finalizó el método registerMetrics");
}
