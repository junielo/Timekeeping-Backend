// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Configurations
const port = process.env.PORT || 8090;
// This is bad. When an uncaught exception is thrown you should consider your application in an unclean state. T_T
process.on('uncaughtException', function(err) {
    console.log( " UNCAUGHT EXCEPTION " );
    console.log( "[Inside 'uncaughtException' event] " + err.stack || err.message );
});

// Instantiations
const app = express();

// Middlewares
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === "OPTIONS")
        res.sendStatus(200);
    else
        next();
});

require('./app/routes') (app, {});

app.listen(port, () => {
console.log('MySQL + NodeExpress API server started on: ' + port);
});