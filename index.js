'use strict'

// Cargamos el fichero app.js con la configuración de Express
var app = require('./app');
var config = require('./config.json');
var Connection = require('tedious').Connection;
var Request = require('tedious').Request
var TYPES = require('tedious').TYPES;
var port = process.env.PORT || 3000;


var connection = new Connection(config);
connection.on('connect', function (err) {

    if (err) {
        console.log("Database connection is not established: \n" + err);
        process.exit(0);
    }
    else {
        console.log("Connected");
    }
});



var getUser = function (request, response, next) {
    var lEmail = request.query.email;

    var lQuery = new Request("traerUsuario", function (err) {
        if (err) {
            console.log(err);
        }
    });
    lQuery.addParameter('Email', TYPES.VarChar, lEmail);
    lQuery.on('row', function (columns) {
        columns.forEach(function (column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                console.log("Product id of inserted item is " + column.value);
            }
        });
    });
    //connection.callProcedure(lQuery);

};


// Define API routes 
app.route('/getUser').get(getUser);
app.listen(port, () => console.log('server is running'));




