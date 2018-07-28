var path = require("path");
var fs = require("fs");
var bodyParser = require("body-parser");
//var oldList;

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.sendFile(path.resolve("./app/data/friend.js"));
    })  

    app.post("/api/friends", bodyParser.json(), function(req, res) {
        var body = req.body;

        console.log(body);
        var oldList;
        fs.readFile(path.resolve("./app/data/friend.js"), 'utf8', function(err, data) {
            var list = [JSON.parse(JSON.stringify(data))];

            var newSurvey = [JSON.stringify(body)];

            list.push(newSurvey);
            fs.writeFile(path.resolve("./app/data/friend.js"), JSON.stringify(list), (err) => {
                if (err) console.log(err);
            })
            res.send("test successful")

        })
    })
}