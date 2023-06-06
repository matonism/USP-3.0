var TankDesignVoteHandler = require('./TankDesignVoteHandler');
var TankDesignEntryHandler = require('./TankDesignEntryHandler');
var TankDesignVoteStandingsHandler = require('./TankDesignVoteStandingsHandler');
var RateLimitFactory = require('./rateLimitFactory');
 const path = require('path');
const RateLimit = require('express-rate-limit');

var serverController = (function(serverController){

	serverController.handleRequests = function(app){

		app.get('/', (req, res) => {
			res.sendFile(path.join(__dirname+'/../pages/testclient.html'));
		});

		app.get('/Tank/Design/Vote', function(req, res){
		    console.log('in tank design votes query');
			TankDesignVoteHandler.get(req, res).then(() => {

		    }).catch((err) => {
		        console.log('ERROR: ' + err.detail);
		        res.status('500').send(err.detail);
		    });

		});

		app.get('/Tank/Design/Vote/Standings', function(req, res){
			TankDesignVoteStandingsHandler.get(req, res).then(() => {

		    }).catch((err) => {
		        console.log('ERROR: ' + err.detail);
		        res.status('500').send(err.detail);
		    });

		});

		app.get('/Tank/Design/Entry', function(req, res){
		    console.log('in tank design entry query');
			TankDesignEntryHandler.get(req, res).then(() => {

		    }).catch((err) => {
		        console.log('ERROR: ' + err.detail);
		        res.status('500').send(err.detail);
		    });

		});


		app.post('/Tank/Design/Vote', RateLimitFactory.tankDesignVoteLimit, function(req, res){		
			console.log('in tank/design/vote')
			try{
				verifyRequestOrigin(req, res);    
				
				TankDesignVoteHandler.post(req, res).then(() => {

			    }).catch((error) => {
			        console.log(error.message);
			        res.status(error.code).send(error.message);
			    });
			}catch(error){
				
				console.log(error.message);
				res.status(error.code).send(error.message);
			}

		});

		app.post('/Tank/Design/Entry', RateLimitFactory.tankDesignEntryLimit, (req, res) => {
			try{

				verifyRequestOrigin(req, res);

				TankDesignEntryHandler.post(req, res).then(() => {

			    }).catch((error) => {
					console.log(error.message);
					res.status(error.code).send(error.message);
			    });

			}catch(error){
				console.log(error.message);
				res.status(error.code).send(error.message);
			}


		});
	}


	var verifyRequestOrigin = (req, res) => {
		var acceptedOrigins = [
		'm.ultimatesummerparty.com',
		'http://m.ultimatesummerparty.com',
		'http://www.m.ultimatesummerparty.com',
		'https://www.m.ultimatesummerparty.com',
		'ultimatesummerparty.com',
		'http://ultimatesummerparty.com',
		'http://www.ultimatesummerparty.com',
		'https://www.ultimatesummerparty.com',
		'http://localhost:5000'
		];
		if(!acceptedOrigins.includes(req.headers.origin)){
			console.log('(' + req.headers.origin + ') attempted to make a request but failed');
			throw {code: 500, message: "You are not authorized to make this request"}
		}
		console.log('Authorized to make request');

	}

	return serverController;

})(serverController || {});

module.exports = serverController;