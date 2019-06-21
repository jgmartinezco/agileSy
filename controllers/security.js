'use strict'

var config = require('../config');
var jwt = require('jsonwebtoken');
var sql = require('mssql');


module.exports.login = function (request, response, next) {

    var lEmail = request.body.email;
    var lIdentifier = request.body.identifier;

    console.log("Se intenta verificar login para el email: " + lEmail + " e Identificador: " + lIdentifier);

    sql.connect(config.DataBase, function (err) {
        if (err) {
            console.log(err);
            response.status(500).send({ error: "error al conectarse" });
        }
        else {
            var lQuery = new sql.Request();
            lQuery.input("Email", sql.VarChar, lEmail);
            lQuery.input("Identificador", sql.VarChar, lIdentifier);
            lQuery.execute("existeUsuario", (err, result) => {
                console.log(err);
                if (result && result.recordset && result.recordset.length > 0) {

                    var lTokenData = { email: lEmail };
                    var token = jwt.sign(lTokenData, config.jwt.secret, {
                        expiresIn: 60 * 60 * 24 // expires in 24 hours
                    });

                    response.send({ token });
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
            response.status(500).send({ error: "error al conectarse" });
        }
        else {
            var lQuery = new sql.Request();
            lQuery.input("Email", sql.VarChar, lEmail);
            lQuery.execute("traerUsuario", (err, result) => {
                console.log(err);
                if (result && result.recordset) {
                    response.send(result.recordset);
                }
                else {
                    response.status(404).send({ error: "No existe el usuario" });
                }
                sql.close();
            });

        }
    });
};

module.exports.getMenu = function (request, response, next) {
    var lRoleId = request.params.RoleId;
    console.log("obtener menu del rol: " + lRoleId);
    sql.connect(config.DataBase, function (err) {
        if (err) {
            console.log(err);
            response.status(500).send({ error: "error al conectarse" });
        }
        else {
            var lQuery = new sql.Request();
            lQuery.input("CodRol", sql.TinyInt, lRoleId);
            lQuery.execute("traerMenu", (err, result) => {
                console.log(err);
                if (result && result.recordset) {
                    response.send({ result: buildMenu(null, result.recordset) });
                }
                else {
                    response.status(404).send({ error: "No existe el rol" });
                }
                sql.close();
            });
        }
    });
}

var buildMenu = function (pParentCode, pItems) {
    var lResult = [];

    for (var i = 0; i < pItems.length; i++) {
        var lItem = pItems[i];
        if (lItem.CODOPCIONMENU === pParentCode) {
            var lChild = { id: lItem.ID_OPCIONMENU, name: lItem.NOMOPCIONMENU, url: lItem.URL, target: lItem.TARGET };
            lChild.childs = buildMenu(lChild.id, pItems);
            lResult.push(lChild);
        }
    }

    return lResult;
}

