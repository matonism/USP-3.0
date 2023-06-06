var TankDesignVoteHandler = require('./TankDesignVoteHandler');
var TankDesignEntryHandler = require('./TankDesignEntryHandler');
const path = require('path');
const RateLimit = require('express-rate-limit');

var rateLimitFactory = (function(rateLimitFactory){

	rateLimitFactory.tankDesignEntryLimit = getTankDesignEntryLimit();
	rateLimitFactory.tankDesignVoteLimit = getTankDesignVoteLimit();

	function getTankDesignEntryLimit(){

		var rateLimiter = new RateLimit({
			windowMs: 60*60*1000, //60 minutes
			max: 10, //number of requests per windowMs time
			delayMs: 0, //disabled delaying - full speed until rate limit is hit
			message: 'You have made too many requests. Try again in an hour'
		});
		return rateLimiter;
	}

	function getTankDesignVoteLimit(){

		var rateLimiter = new RateLimit({
			windowMs: 12*60*60*1000, //12 hours
			max: 3, //number of requests per windowMs time
			delayMs: 0, //disabled delaying - full speed until rate limit is hit
			message: 'You have made too many requests today. Try again tomorrow'
		});
		return rateLimiter;
	}


	return rateLimitFactory;

})(rateLimitFactory || {});

module.exports = rateLimitFactory;