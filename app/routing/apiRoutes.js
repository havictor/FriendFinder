var path = require("path");
var fs = require("fs");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.sendFile(path.resolve("./app/data/friend.js"));
    })  

    app.post("/api/friends", function(req, res) {
        req.appendFile(path.resolve("./app/data/friend.js"), req.body.survey, (err) => {
            if (err) console.log(err);
        })
        console.log("post successful")
    })
}