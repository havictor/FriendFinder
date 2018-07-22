var path = require("path");

module.exports = function(app) {
    app.get("/survey", function(req, res) {
        res.sendFile(path.resolve("./app/public/survey.html"));
    })

    app.get("/*", function(req, res) {
        res.sendFile(path.resolve("./app/public/home.html"));
    })
}

//A GET Route to /survey which should display the survey page.
//A default, catch-all route that leads to home.html which displays the home page.