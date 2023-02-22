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
require("reflect-metadata");
var express = require("express");
var root_1 = require("./routes/root");
var utils_1 = require("./utils");
var logger_1 = require("./logger");
var data_source_1 = require("./data-source");
var get_all_courses_1 = require("./routes/get-all-courses");
var default_error_handler_1 = require("./middlewares/default-error-handler");
var cors = require("cors");
var app = express();
function setupExpress() {
    app.use(cors({ origin: true }));
    app.route("/").get(root_1.root);
    app.route("/api/courses").get(get_all_courses_1.getAllCourses);
    app.use(default_error_handler_1.defaultErrorHandler);
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
data_source_1.AppDataSource.initialize()
    .then(function () {
    logger_1.logger.info("The datasource has been initialized successfully.");
    setupExpress();
    startServer();
})
    .catch(function (err) {
    logger_1.logger.error("Error during the datasource initialization.", err);
    process.exit(1);
});
