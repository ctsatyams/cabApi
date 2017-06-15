/*
 Copyright (c) Microsoft Corporation
 All Rights Reserved
 Apache License 2.0

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

'use strict';

/**
 * Module dependencies.
 */

var fs = require('fs');
var path = require('path');
var util = require('util');
var assert = require('assert-plus');
// var mongoose = require('mongoose/');
var bunyan = require('bunyan');
var restify = require('restify');
var config = require('./config');
var passport = require('passport');
var OIDCBearerStrategy = require('passport-azure-ad').BearerStrategy;


// We pass these options in to the ODICBearerStrategy.

var options = {
    // The URL of the metadata document for your app. We will put the keys for token validation from the URL found in the jwks_uri tag of the in the metadata.
    clientID:config.creds.clientID,
    clientSecret:config.creds.clientSecret,
    identityMetadata: config.creds.identityMetadata,
    issuer: config.creds.issuer,
    audience: config.creds.audience,
    validateIssuer: config.creds.validateIssuer,
    passReqToCallback: config.creds.passReqToCallback,
    loggingLevel: config.creds.loggingLevel
};

// array to hold logged in users and the current logged in user (owner)
var users = [];
var owner = null;

// Our logger
var log = bunyan.createLogger({
    name: 'Microsoft OAuth2 Example Web Application',
         streams: [
        {
            stream: process.stderr,
            level: "error",
            name: "error"
        }, 
        {
            stream: process.stdout,
            level: "warn",
            name: "console"
        }, ]
});


// var Connection = require('tedious').Connection;
// // var sql = require('mssql');
// var Request = require('tedious').Request;
// // Create connection to database
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
// Setting Base directory
app.use(bodyParser.json());

//CORS Middleware
// app.use(function (req, res, next) {
//     //Enabling CORS 
//      // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
//     // res.header("Access-Control-Allow-Origin", "http://localhost:8888");
//     // res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
//     // next();
// });


var config = {
    user: 'sa',
    password: 'password_123',
    server: 'localhost',
    database: 'cabbooking',
    dialect: "mssql",
    options: {
        truestedConnection: true,
        encrypt: true // Use this if you're on Windows Azure
    },

};


// var config = {
//     user: 'satyams',
//     password: 'Citius@1234',
//     server: 'firerock.database.windows.net',
//     database: 'cabbooking',
//     dialect: "mssql",
//     options: {
//         truestedConnection: true,
//         encrypt: true // Use this if you're on Windows Azure
//     },
//     // dialectOptions: {
//     //     instanceName: "SQLEXPRESS"
//     // }
// };
 function getBooking  (req, res) {
    debugger;
   console.log(req.query);
    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        //  var request = new sql.Request();

        //3.
        var request = new sql.Request();
        request.input('Action', sql.VarChar, 'Get')
        request.input('FromStation', sql.VarChar, req.query.FromStation)
        request.input('ToStation', sql.VarChar,req.query.ToStation)
            .execute("USP_CabBooking").then(function (recordSet) {
                res.send(recordSet);
                sql.close()
            }).catch(function (err) {
                console.log(err);
                sql.close()
            });
 
    });
};
// app.get("/booking", function  (req, res) {
//     debugger;
//    console.log(req.query);
//     sql.connect(config, function (err) {

//         if (err) console.log(err);

//         // create Request object
//         //  var request = new sql.Request();

//         //3.
//         var request = new sql.Request();
//         request.input('Action', sql.VarChar, 'Get')
//         request.input('FromStation', sql.VarChar, req.query.FromStation)
//         request.input('ToStation', sql.VarChar,req.query.ToStation)
//             .execute("USP_CabBooking").then(function (recordSet) {
//                 res.send(recordSet);
//                 sql.close()
//             }).catch(function (err) {
//                 console.log(err);
//                 sql.close()
//             });
//         //     }).catch(function (err) {
//         //             //6.
//         //             console.log(err);
//         //     });

//         // query to the database and get the records
//         // request.query('select * from student', function (err, recordset) {

//         //     if (err) console.log(err)

//         //     // send records as a response
//         //     res.send(recordset);

//         // });
//     });
// });
// app.post("/booking", function (req, res) {
//     console.log(req.body.id);
//     // connect to your database
//     sql.connect(config, function (err) {
//         // console.log(err);

//         if (err) {
//             console.log(err)
//             sql.close()
//         };

//         var request = new sql.Request();
//         request.input('Action', sql.VarChar, 'Insert')
//         request.input('CABID', sql.Int, req.body.Id)
//         request.input('TRAVLLERNAME', sql.VarChar, 'rupak')
//             .execute("USP_CabBooking").then(function (recordSet) {
//                 res.send(recordSet);
//                 sql.close()
//             }).catch(function (err) {
//                 console.log(err);
//                 sql.close()
//             });

//     });
// });
// app.put("/booking", function (req, res) {
//     console.log(req.body);
//     // connect to your database
//     sql.connect(config, function (err) {
//         // console.log(err);

//         if (err) {
//             console.log(err)
//             sql.close()
//         };

//         var request = new sql.Request();
//         request.input('Action', sql.VarChar, 'Update')
//         request.input('CABID', sql.Int, req.body.Tid)
//         request.input('TRAVLLERNAME', sql.VarChar, 'rupak')
//             .execute("USP_CabBooking").then(function (recordSet) {
//                 res.send(recordSet);
//                 sql.close()
//             }).catch(function (err) {
//                 console.log(err);
//                 sql.close()
//             });

//     });
// });
// app.get("/bookingList", function (req, res) {
//     sql.connect(config, function (err) {

//         if (err) console.log(err);

//         var request = new sql.Request();
//         request.input('Action', sql.VarChar, 'BookingList')
//             .execute("USP_CabBooking").then(function (recordSet) {
//                 res.send(recordSet);
//                 sql.close()
//             }).catch(function (err) {
//                 console.log(err);
//                 sql.close()
//             });
//     });
// });

// var portNumber = process.env.port || process.env.PORT || 5000
// var server = app.listen(portNumber, function () {

//      console.log('Server listening at port %d', portNumber);
// });





/**
 * Our Server
 */


var server = restify.createServer({
    name: "Windows Azure Active Directroy TODO Server",
    version: "2.0.1"
});

// Ensure we don't drop data on uploads
server.pre(restify.pre.pause());

// Clean up sloppy paths like //todo//////1//
server.pre(restify.pre.sanitizePath());

// Handles annoying user agents (curl)
server.pre(restify.pre.userAgentConnection());

// Set a per request bunyan logger (with requestid filled in)
server.use(restify.requestLogger());

// Allow 5 requests/second by IP, and burst to 10
server.use(restify.throttle({
    burst: 10,
    rate: 5,
    ip: true,
}));

// Use the common stuff you probably want
server.use(restify.acceptParser(server.acceptable));
server.use(restify.dateParser());
server.use(restify.queryParser());
server.use(restify.gzipResponse());
server.use(restify.bodyParser({
    mapParams: true
})); // Allows for JSON mapping to REST
server.use(restify.authorizationParser()); // Looks for authorization headers

// Let's start using Passport.js

server.use(passport.initialize()); // Starts passport
server.use(passport.session()); // Provides session support

/**
/*
/* Calling the OIDCBearerStrategy and managing users
/*
/* Passport pattern provides the need to manage users and info tokens
/* with a FindorCreate() method that must be provided by the implementor.
/* Here we just autoregister any user and implement a FindById().
/* You'll want to do something smarter.
**/

var findById = function(id, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
        if (user.sub === id) {
            log.info('Found user: ', user);
            return fn(null, user);
        }
    }
    return fn(null, null);
};


var oidcStrategy = new OIDCBearerStrategy(options,
    function(token, done) {
        log.info('verifying the user');
        log.info(token, 'was the token retreived');
        findById(token.sub, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                // "Auto-registration"
                log.info('User was added automatically as they were new. Their sub is: ', token.sub);
                users.push(token);
                owner = token.sub;
                return done(null, token);
            }
            owner = token.sub;
            return done(null, user, token);
        });
    }
);

passport.use(oidcStrategy);

/// Now the real handlers. Here we just CRUD

/**
/*
/* Each of these handlers are protected by our OIDCBearerStrategy by invoking 'oidc-bearer'
/* in the pasport.authenticate() method. We set 'session: false' as REST is stateless and
/* we don't need to maintain session state. You can experiement removing API protection
/* by removing the passport.authenticate() method like so:
/*
/* server.get('/tasks', listTasks);
/*
**/
function createTask(req, res, next) {

    // Restify currently has a bug which doesn't allow you to set default headers.
    // These headers comply with CORS and allow us to mongodbServer our response to any origin.

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    // Create a new task model, fill it, and save it to Mongodb.
    var _task = new Task();

    if (!req.params.task) {
        req.log.warn('createTodo: missing task');
        next(new MissingTaskError());
        return;
    }

    _task.owner = owner;
    _task.task = req.params.task;
    _task.date = new Date();

    _task.save(function(err) {
        if (err) {
            req.log.warn(err, 'createTask: unable to save');
            next(err);
        } else {
            res.send(201, _task);

        }
    });

    return next();

}

server.get('/booking', passport.authenticate('oauth-bearer', {
    session: true
}), getBooking);
// server.get('/tasks', passport.authenticate('oauth-bearer', {
//     session: false
// }), listTasks);
// server.get('/tasks/:owner', passport.authenticate('oauth-bearer', {
//     session: false
// }), getTask);
// server.head('/tasks/:owner', passport.authenticate('oauth-bearer', {
//     session: false
// }), getTask);
// server.post('/tasks/:owner/:task', passport.authenticate('oauth-bearer', {
//     session: false
// }), createTask);
// server.post('/tasks', passport.authenticate('oauth-bearer', {
//     session: false
// }), createTask);
// server.del('/tasks/:owner/:task', passport.authenticate('oauth-bearer', {
//     session: false
// }), removeTask);
// server.del('/tasks/:owner', passport.authenticate('oauth-bearer', {
//     session: false
// }), removeTask);
// server.del('/tasks', passport.authenticate('oauth-bearer', {
//     session: false
// }), removeTask);
// server.del('/tasks', passport.authenticate('oauth-bearer', {
//     session: false
// }), removeAll, function respond(req, res, next) {
//     res.send(204);
//     next();
// });


// Register a default '/' handler

server.get('/', function root(req, res, next) {
    var routes = [
        'GET     /booking'
        // 'POST    /tasks/:owner/:task',
        // 'POST    /tasks (for JSON body)',
        // 'GET     /tasks',
        // 'PUT     /tasks/:owner',
        // 'GET     /tasks/:owner',
        // 'DELETE  /tasks/:owner/:task'
    ];
    res.send(200, routes);
    next();
});

 var serverPort = process.env.port || process.env.PORT || 5000
// var server = app.listen(portNumber, function () {

//      console.log('Server listening at port %d', portNumber);
// });
server.listen(serverPort, function() {

    var consoleMessage = '\n Windows Azure Active Directory Tutorial';
    consoleMessage += '\n +++++++++++++++++++++++++++++++++++++++++++++++++++++';
    consoleMessage += '\n %s server is listening at %s';
    consoleMessage += '\n Open your browser to %s/tasks\n';
    consoleMessage += '+++++++++++++++++++++++++++++++++++++++++++++++++++++ \n';
    consoleMessage += '\n !!! why not try a $curl -isS %s | json to get some ideas? \n';
    consoleMessage += '+++++++++++++++++++++++++++++++++++++++++++++++++++++ \n\n';

    log.info(consoleMessage, server.name, server.url, server.url, server.url);

});


