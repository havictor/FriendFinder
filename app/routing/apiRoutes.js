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

        var oldList;
        fs.readFile(path.resolve("./app/data/friend.js"), 'utf8', function(err, data) {
            var list = JSON.parse(data);

            var newSurveyString = JSON.stringify(body);

            var newSurvey = JSON.parse(newSurveyString)
            //console.log(list)

            //function to figure out best friend:
            //function to compare friends in database (gotta grab json object to pass to variable, foreach, then return best fit)
            var otherPeople = list//[0][0][0][0]; //due to weird error
            var scoreList = [];

            //console.log(otherPeople)
            
            otherPeople.forEach(function(name) {    
                var i = 0;
                var score = 0;
                while (i < 10) {
                    score += Math.abs(parseInt(newSurvey.scores[i])-parseInt(name.scores[i]))
                    i++
                }

                // for (var i = 0; i < 10; i++) {
                //     score += Math.abs(parseInt(newSurvey.scores[i])-parseInt(name.scores[i]))
                // }

                scoreList.push(score);
            });

            //async?

            var mostCommonPoints = Math.min(...scoreList);

            var otherPeoplePosition = scoreList.indexOf(mostCommonPoints);
            

            //and back to normal stuff
            // console.log(newSurvey);
            list.push(newSurvey);
            console.log(list);
            fs.writeFile(path.resolve("./app/data/friend.js"), JSON.stringify(list), (err) => { //removed stringify from list
                if (err) console.log(err);
            })

            // res.send(otherPeople[otherPeoplePosition]) //correct response?
            
        })
    })
}