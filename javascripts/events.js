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