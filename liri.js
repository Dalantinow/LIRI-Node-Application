require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var divider = "\n---------------------------------------------\n\n";
var term = process.argv.slice(3).join(" ");
var request = process.argv[2];

function concertthis(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function (response) {
            console.log("\nThe next concert for " + artist + " is at " + response.data[0].venue.name +
                " in " + response.data[0].venue.city + ', ' + response.data[0].venue.country + " on " + moment(response.data[0].datetime).format('L') + ".\n"
            );
            console.log(divider);
        });
};

function spotifythis(song) {
    if (term === undefined && request === "do-what-it-says") {
        spotify.search({ type: 'track', query: song, limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            };
            var songData = [
                "Artist: " + data.tracks.items[0].album.artists[0].name,
                "Song: " + data.tracks.items[0].name,
                "Album: " + data.tracks.items[0].album.name,
                "Preview MP3 URL: " + data.tracks.items[0].preview_url
            ].join("\n\n");
            console.log(songData);
            console.log(divider);
        });
    }
    else if (term === undefined) {
        spotify.search({ type: 'track', query: "The Sign Ace of Base", limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            };
            var songData = [
                "Artist: " + data.tracks.items[0].album.artists[0].name,
                "Song: " + data.tracks.items[0].name,
                "Album: " + data.tracks.items[0].album.name,
                "Preview MP3 URL: " + data.tracks.items[0].preview_url
            ].join("\n\n");
            console.log(songData);
            console.log(divider);
        });
    }

    else {
        spotify.search({ type: 'track', query: song, limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            };
            var songData = [
                "Artist: " + data.tracks.items[0].album.artists[0].name,
                "Song: " + data.tracks.items[0].name,
                "Album: " + data.tracks.items[0].album.name,
                "Preview MP3 URL: " + data.tracks.items[0].preview_url
            ].join("\n\n");
            console.log(songData);
            console.log(divider);
                });
    };
};

function moviethis(movie) {
    if (term === undefined && request === "do-what-it-says") {
        axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                var movieData = [
                    "Movie Title: " + response.data.Title,
                    "Year Released: " + response.data.Year,
                    "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value,
                    "IMDB Rating: " + response.data.imdbRating,
                    "Country: " + response.data.Country,
                    "Language: " + response.data.Language,
                    "Plot Summary: " + response.data.Plot,
                    "Actors: " + response.data.Actors
                ].join("\n\n");
                console.log(movieData);
                console.log(divider);
            }
        );
    }
    else if (term === undefined) {
        axios.get("http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=trilogy").then(
            function (response) {
                var movieData = [
                    "Movie Title: " + response.data.Title,
                    "Year Released: " + response.data.Year,
                    "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value,
                    "IMDB Rating: " + response.data.imdbRating,
                    "Country: " + response.data.Country,
                    "Language: " + response.data.Language,
                    "Plot Summary: " + response.data.Plot,
                    "Actors: " + response.data.Actors
                ].join("\n\n");
                console.log(movieData);
                console.log(divider);
            }
        );
    }
    else {
        axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                var movieData = [
                    "Movie Title: " + response.data.Title,
                    "Year Released: " + response.data.Year,
                    "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value,
                    "IMDB Rating: " + response.data.imdbRating,
                    "Country: " + response.data.Country,
                    "Language: " + response.data.Language,
                    "Plot Summary: " + response.data.Plot,
                    "Actors: " + response.data.Actors
                ].join("\n\n");
                console.log(movieData);
                console.log(divider);
            }
        );
    }
};

if (request === "concert-this") {
    concertthis(term);
}
else if (request === "spotify-this-song") {
    spotifythis(term);
}
else if (request === "movie-this") {
    moviethis(term);
}
else if (request === "do-what-it-says") {
    fs.readFile("./random.txt", "utf8", (err, data) => {
        
        if (err) throw err;
        
        var dataArr = data.split(",")
 
        for (var i = 0; i < dataArr.length; i++) {
            if (i % 2 === 0) {
                if (dataArr[i] === "spotify-this-song") {
                    ;
                    spotifythis(dataArr[i + 1]);
                }
                else if (dataArr[i] === "concert-this") {
                    
                    ;
                    concertthis(dataArr[i + 1]);
                }
                else if (dataArr[i] === "movie-this") {
                    ;
                    moviethis(dataArr[i + 1]);

                }
            }
        }
    })
};



