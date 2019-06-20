'use strict'

var config = require('../config.json');
var jwt = require('jsonwebtoken');
var sql = require('mssql');


module.exports.login = function (request, response, next) {

    var lEmail = request.body.email;
    var lIdentifier = request.body.identifier;

    console.log("Se intenta verificar login para el email: " + lEmail + " e Identificador: " + lIdentifier);

    sql.connect(config.DataBase, function (err) {
        if (err) {
            console.log(err);
            response.send("Error al procesar la petición");
        }
        else {
            var lQuery = new sql.Request();
            lQuery.input("Email", sql.VarChar, lEmail);
            lQuery.input("Identificador", sql.VarChar, lIdentifier);
            lQuery.execute("existeUsuario", (err, result) => {
                console.log(err);
                if (result && result.recordset && result.recordset.length > 0) {
                    lResult = 1;
                    var lTokenData = { email: lEmail };
                    var lToken = jwt.sign(lTokenData, config.jwt.secret, {
                        expiresIn: 60 * 60 * 24 // expires in 24 hours
                    });
                    response.send({ lToken });
                }
                else {
                    response.status(401).send({ error: "credenciales inválidas" });
                }
                sql.close();
            });
        }
    });

};


module.exports.getUser = function (request, response, next) {

    var lEmail = request.params.email;
    console.log("obtener usuario del email: " + lEmail);
    sql.connect(config.DataBase, function (err) {
        if (err) {
            console.log(err);
            response.send("error al conectarse");
        }
        else {
            var lQuery = new sql.Request();
            lQuery.input("Email", sql.VarChar, lEmail);
            lQuery.execute("traerUsuario", (err, result) => {
                console.log(err);
                if (result && result.recordset) {

                }
            });
        }
    });
};

module.exports.getMenu = function (request, response, next) {
    response.send("entró a traer el menú");
}

