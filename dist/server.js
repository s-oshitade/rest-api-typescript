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
var find_course_by_url_1 = require("./routes/find-course-by-url");
var find_lessons_for_course_1 = require("./routes/find-lessons-for-course");
var update_course_1 = require("./routes/update-course");
var create_course_1 = require("./routes/create-course");
var delete_course_1 = require("./routes/delete-course");
var create_user_1 = require("./routes/create-user");
var login_1 = require("./routes/login");
var authentication_checkpoint_1 = require("./middlewares/authentication-checkpoint");
var admin_only_middleware_1 = require("./middlewares/admin-only.middleware");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
function setupExpress() {
    app.use(cors({ origin: true }));
    app.use(bodyParser.json());
    app.route("/").get(root_1.root);
    app.route("/api/courses").get(authentication_checkpoint_1.checkIfAuthenticated, get_all_courses_1.getAllCourses);
    app.route("/api/courses/:courseUrl").get(authentication_checkpoint_1.checkIfAuthenticated, find_course_by_url_1.findCourseByUrl);
    app.route("/api/courses/:courseId/lessons").get(authentication_checkpoint_1.checkIfAuthenticated, find_lessons_for_course_1.findLessonsForCourse);
    app.route("/api/courses/:courseId").patch(authentication_checkpoint_1.checkIfAuthenticated, update_course_1.updateCourse);
    app.route("/api/courses").post(authentication_checkpoint_1.checkIfAuthenticated, create_course_1.createCourse);
    app.route("/api/courses/:courseId").delete(authentication_checkpoint_1.checkIfAuthenticated, delete_course_1.deleteCourseAndLessons);
    app.route("/api/users").post(authentication_checkpoint_1.checkIfAuthenticated, admin_only_middleware_1.checkIfAdmin, create_user_1.createUser);
    app.route("/api/login").post(login_1.login);
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
