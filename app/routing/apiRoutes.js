var path = require("path");
var fs = require("fs");
var bodyParser = require("body-parser");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.sendFile(path.resolve("./app/data/friend.js"));
    })  

    app.post("/api/friends", bodyParser.json(), function(req, res) {
        var body = req.body;

        fs.readFile(path.resolve("./app/data/friend.js"), 'utf8', function(err, data) {
            var list = JSON.parse(data);

            var newSurveyString = JSON.stringify(body);

            var newSurvey = JSON.parse(newSurveyString)
            
            var otherPeople = list
            var scoreList = [];
            
            otherPeople.forEach(function(name) {    
                var i = 0;
                var score = 0;
                while (i < 10) {
                    score += Math.abs(parseInt(newSurvey.scores[i])-parseInt(name.scores[i]))
                    i++
                }

                scoreList.push(score);
            });

            var mostCommonPoints = Math.min(...scoreList);

            var otherPeoplePosition = scoreList.indexOf(mostCommonPoints);

            list.push(newSurvey);

            fs.writeFile(path.resolve("./app/data/friend.js"), JSON.stringify(list), (err) => { //removed stringify from list
                if (err) console.log(err);
            })

            res.send(otherPeople[otherPeoplePosition]);
        })
    })
}