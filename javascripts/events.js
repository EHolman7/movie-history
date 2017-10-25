"use strict";

const tmdb = require('./tmdb');
const dom = require('./dom');
const firebaseApi = require('./firebaseApi');

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

const myLinks = () => {
	$(document).click((e) => {
		if(e.target.id === 'navSearch'){
			$('#search').removeClass('hide');
			$('#myMovies').addClass('hide');
			$('#authScreen').addClass('hide');
		}else if(e.target.id === 'mine') {
			$('#search').addClass('hide');
			$('#myMovies').removeClass('hide');
			$('#authScreen').addClass('hide');
			firebaseApi.getMoviesList().then((results) => {
				dom.clearDom('moviesMine');
				dom.domString(results, tmdb.getImgConfig(), 'moviesMine');
			}).catch((err) => {
				console.log("error in getMoviesList", err);
			});
		}else if(e.target.id === 'nauthenticate') {
			$('#search').addClass('hide');
			$('#myMovies').addClass('hide');
			$('#authScreen').removeClass('hide');
		}
	});
};

const googleAuth = () => {
	$('#googleButton').click((e) => {
		firebaseApi.authenticateGoogle().then((result) => {
			console.log("result", result);
		}).catch((err) =>{
			console.log("error in authenticate", err);
		});
	});
};

const wishListEvents = () => {
	$('body').on('click', '.wishlist', (e) => {
		//console.log("wishlist event", e);
		let mommy = e.target.closest('.movie');

		let newMovie = {
			"title": $(mommy).find('.title').html(),
			"overview": $(mommy).find('.overview').html(),
			"poster_path": $(mommy).find('.poster_path').attr('src').split('/').pop(),
			"rating": 0,
			"isWatched": "false",
			"uid": ""
		};
		console.log("newMovie", newMovie);
		firebaseApi.saveMovie(newMovie).then((results) => {
			$(mommy).remove();
		}).catch((err) => {
			console.log("error in saveMovie", err);
		});

	});
};




module.exports = {pressEnter, myLinks, googleAuth, wishListEvents};