var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var survey = {};

var app = express();

app.use(bodyParser.json());

var port = 8080;

app.listen(port, function() {
    console.log("connected on port "+port)
})

require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);