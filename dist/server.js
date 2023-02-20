"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var result = dotenv.config();
if (result.error) {
    //This is the only place in the application where console.log is used
    console.log("Error loading environment variables, aborting.");
    process.exit(1);
}
console.log(process.env.PORT);
var express = require("express");
var root_1 = require("./routes/root");
var utils_1 = require("./utils");
var logger_1 = require("./logger");
var app = express();
function setupExpress() {
    app.route("/").get(root_1.root);
}
function startServer() {
    var port;
    var portEnv = process.env.PORT, portArg = process.argv[2];
    if ((0, utils_1.isInteger)(portEnv)) {
        port = parseInt(portEnv);
    }
    if (!port && (0, utils_1.isInteger)(portArg)) {
        port = parseInt(portArg);
    }
    if (!port) {
        port = 9000;
    }
    app.listen(port, function () {
        logger_1.logger.info("HTTP REST API Server is now running at http://localhost:".concat(port));
    });
}
setupExpress();
startServer();
