"use strict";

let tmdbKey;
const dom = require('./dom');

const searchTMDB = (query) => {
	// promise search Movies
	return new Promise((resolve, reject) => {
		$.ajax(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&language=en-US&page=1&include_adult=false&query=${query}`).done((data) => {
			//console.log(data);
			resolve(data.results);
		}).fail((error) => {
			reject(error);
		});
	});
};

const searchMovies = (query) => {
	// execute searchTMDB
	searchTMDB(query).then((data) => {
		console.log("data", data);
		showResults(data);
	}).catch((error) => {
		//console.log("error in search Movies", error);
	});
};

const setKey = (apiKey) => {
	// sets tmdbKey
	tmdbKey = apiKey;
	console.log("tmdbKey", tmdbKey);
};

const showResults = (movieArray) => {
	dom.clearDom();
	dom.domString(movieArray);
};

module.exports = {setKey, searchMovies};