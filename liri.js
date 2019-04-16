require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);

function concertthis(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function (response) {
            console.log("The next concert for " + artist + " is at " + response.data[0].venue.name +
                " in " + response.data[0].venue.city + ', ' + response.data[0].venue.country + " on " + moment(response.data[0].datetime).format('L') + "."
            );
        });
}

function spotifythis(song) {
    if (process.argv[3] === undefined && process.argv[2] === "do-what-it-says") {
        spotify.search({ type: 'track', query: song, limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Preview MP3 URL: " + data.tracks.items[0].preview_url)
        })
    }
    else if (process.argv[3] === undefined) {
        spotify.search({ type: 'track', query: "The Sign Ace of Base", limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Preview MP3 URL: " + data.tracks.items[0].preview_url)
        })
    }

    else {
        spotify.search({ type: 'track', query: song, limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Preview MP3 URL: " + data.tracks.items[0].preview_url)
        })
    }
};

function moviethis(movie) {
    if (process.argv[3] === undefined && process.argv[2] === "do-what-it-says") {
        axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
            function (response) {

                console.log("Movie Title: " + response.data.Title);
                console.log("Year Released: " + response.data.Year);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot Summary: " + response.data.Plot)
                console.log("Actors: " + response.data.Actors);
            }
        );
    }
    else if (process.argv[3] === undefined) {
        axios.get("http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=trilogy").then(
            function (response) {

                console.log("Movie Title: " + response.data.Title);
                console.log("Year Released: " + response.data.Year);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot Summary: " + response.data.Plot)
                console.log("Actors: " + response.data.Actors);
            }
        );
    }
    else {
        axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                console.log("Movie Title: " + response.data.Title);
                console.log("Year Released: " + response.data.Year);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot Summary: " + response.data.Plot)
                console.log("Actors: " + response.data.Actors);
            }
        );
    }
};

if (process.argv[2] === "concert-this") {
    concertthis(process.argv[3]);
}
else if (process.argv[2] === "spotify-this-song") {
    spotifythis(process.argv[3]);
}
else if (process.argv[2] === "movie-this") {
    moviethis(process.argv[3]);
}
else if (process.argv[2] === "do-what-it-says") {
    fs.readFile("./random.txt", "utf8", (err, data) => {
        
        if (err) throw err;
        
        var dataArr = data.split(",")
 
        for (var i = 0; i < dataArr.length; i++) {
            if (i % 2 === 0) {
                if (dataArr[i] === "spotify-this-song") {
                    console.log("-------------------");
                    spotifythis(dataArr[i + 1]);
                }
                else if (dataArr[i] === "concert-this") {
                    
                    console.log("-------------------");
                    concertthis(dataArr[i + 1]);
                }
                else if (dataArr[i] === "movie-this") {
                    console.log("-------------------");
                    moviethis(dataArr[i + 1]);

                }
            }
        }
    })
};



