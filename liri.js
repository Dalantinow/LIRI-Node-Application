require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var doing = require("./random.txt");
var spotify = new Spotify(keys.spotify);

function concertthis() {
    var artist = process.argv[2];
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function (response) {
            console.log("The next concert for " + artist + " is at " + response.data[0].venue.name +
                " in " + response.data[0].venue.city + response.data[0].venue.country + " on " + moment(response.data[0].datetime, 'MM/DD/YYYY')
            );
        });
}

function spotify() {
    if (process.arg[3] === null) {
        spotify.search({ type: 'track', query: "The Sign Ace of Base", limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log(data.tracks.items[0])
        })
    }
    else {
        var song = process.argv[4];
        spotify.search({ type: 'track', query: song, limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log(data.tracks.items[0])
        })
    }
};

function moviethis() {
    if (process.argv[3] === null) {
        axios.get("http://www.omdbapi.com/?t=Mr.nobody&y=&plot=short&apikey=trilogy").then(
            function (response) {
                console.log("Movie Title: " + response.data.title);
                console.log("Year Released: " + response.data.year);
                console.log("RottenTomatoes Rating: " + response.data.ratings[1].value)
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Country: " + response.data.country);
                console.log("Language: " + response.data.language);
                console.log("Plot Summary: " + response.data.plot)
                console.log("Actors: " + response.data.actors);
            }
        );
    }

    else {
        var movie = process.argv[4];
        axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                console.log("Movie Title: " + response.data.title);
                console.log("Year Released: " + response.data.year);
                console.log("RottenTomatoes Rating: " + response.data.ratings[1].value)
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Country: " + response.data.country);
                console.log("Language: " + response.data.language);
                console.log("Plot Summary: " + response.data.plot)
                console.log("Actors: " + response.data.actors);
            }
        );
    }
};

if (process.argv[2] === "concert-this") {
    concertthis();
}
else if (process.argv[2] === "spotify-this-song") {
    spotify();
}
else if (process.argv[2] === "movie-this") {
    moviethis();
}
else if (process.argv[2] === "do-what-it-says") {
    fs.readFile("./random.txt", (err, data) => {
        if (err) throw err;
        for (var i = 0; i < data.length; i++) {
            if (i % 2 === 0) {
                if (data[i] === "spotify-this-song") {
                    searchSpotify(fileData[i + 1]);
                }
                console.log(fileData[i]);
                if (data[i] === "concert-this") {
                    console.log(fileData[i]);
                    concertthis(fileData[i + 1]);
                }
                if (data[i] === "movie-this") {
                    moviethis(fileData[i + 1]);
                }
            }
        }
    })

};



