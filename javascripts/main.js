"use strict";

let events = require('./events');
let apiKeys = require('./apiKeys');

apiKeys.retrieveKeys();
// events.myLinks();
// events.googleAuth();
// events.pressEnter();
// events.wishListEvents();
// events.reviewEvents();
events.init();