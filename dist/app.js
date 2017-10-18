(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

const tmdb = require('./tmdb');

const apiKeys = () => {
	return new Promise((resolve, reject) => {
		$.ajax('./db/apiKeys.json').done((data) => {
			resolve(data.apiKeys);
		}).fail((error) => {
			//console.log('api keys error!', error);
			reject(error);
		});
	});
};

const retrieveKeys = () => {
	apiKeys().then((results) => {
		tmdb.setKey(results.tmdb.apiKey);
	}).catch((error) => {
		console.log("error in retrieve keys", error);
	});
};

module.exports = {retrieveKeys};
},{"./tmdb":5}],2:[function(require,module,exports){
"use strict";

const domString = (movieArray, imgConfig) => {
	console.log("movieArray", movieArray);
	let domStrang = "";
	for (let i = 0; i < movieArray.length; i ++){
		if (i % 3 === 0){
			domStrang += `<div class="row">`;	
		}
		domStrang += `<div class="col-sm-6 col-md-4">`;
		domStrang += 	`<div class="thumbnail">`;
		domStrang += 		`<img src="${imgConfig.base_url}/w342/${movieArray[i].poster_path}" alt="...">`;
		domStrang += 		`<div class="caption">`;
		domStrang += 			`<h3>${movieArray[i].original_title}</h3>`;
		domStrang += 			`<p>${movieArray[i].overview}</p>`;
		domStrang += 			`<p><a href="#" class="btn btn-primary" role="button">Review</a> <a href="#" class="btn btn-default" role="button">Watchlist</a></p>`;
		domStrang += 			`</div>`;
		domStrang += 		`</div>`;
		domStrang += 	`</div>`;
		if (i % 3 === 2 || i === movieArray.length - 1){
		domStrang += `</div>`;	
		}		
	}
	printToDom(domStrang);
};

const printToDom = (strang) => {
	$("#movies").append(strang);
};

const clearDom = () => {
$('#movies').empty();
};

module.exports = {domString, clearDom};
},{}],3:[function(require,module,exports){
"use strict";

const tmdb = require('./tmdb');

const pressEnter = () => {
	$(document).keypress((e) => {
		if(e.key === 'Enter'){
			//console.log("inside enter");
			let searchText = $('#searchBar').val();
			let query = searchText.replace(/ /g, "%20");
			console.log("query", query);
			tmdb.searchMovies(query);
		}
	});
};

module.exports = {pressEnter};
},{"./tmdb":5}],4:[function(require,module,exports){
"use strict";

//let dom = require("./dom");

// let singleMovie = {
// 		adult:false,
// 		backdrop_path:"/c2Ax8Rox5g6CneChwy1gmu4UbSb.jpg",
// 		genre_ids:[28, 12, 878, 14],
// 		id:140607,
// 		original_language:"en",
// 		original_title:"Star Wars: The Force Awakens",
// 		overview:"Thirty years after defeating the Galactic Empire, Han Solo and his allies face a new threat from the evil Kylo Ren and his army of Stormtroopers.",
// 		popularity:49.408373,
// 		poster_path:"/weUSwMdQIa3NaXVzwUoIIcAi85d.jpg",
// 		release_date:"2015-12-15",
// 		title:"Star Wars: The Force Awakens",
// 		video:false,
// 		vote_average:7.5,
// 		vote_count:7965
// 	};

// dom.domString([singleMovie, singleMovie, singleMovie, singleMovie]);

let events = require('./events');
let apiKeys = require('./apiKeys');

apiKeys.retrieveKeys();
events.pressEnter();
},{"./apiKeys":1,"./events":3}],5:[function(require,module,exports){
"use strict";

let tmdbKey;
let imgConfig;
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

const tmdbConfiguration = () => {
	return new Promise((resolve, reject) => {
		$.ajax(`https://api.themoviedb.org/3/configuration?api_key=${tmdbKey}`).done((data) => {
			resolve(data.images);
		}).fail((error) => {
			reject(error);
		});
	});
};

const getConfig = () => {
	tmdbConfiguration().then((results) => {
		imgConfig = results;
		console.log(imgConfig);
	}).catch((error) => {
		console.log("Error in getConfig", error);
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
	//console.log("tmdbKey", tmdbKey);
	getConfig();
};

const showResults = (movieArray) => {
	dom.clearDom();
	dom.domString(movieArray, imgConfig);
};

module.exports = {setKey, searchMovies};
},{"./dom":2}]},{},[4]);
