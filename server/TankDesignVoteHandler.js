var RequestHelper = require('./RequestHelper');
var TankDesignVoteDA = require('./TankDesignVoteDA');

var DESIGN_VOTE = 'design-vote';

var TankDesignVoteHandler = (function(TankDesignVoteHandler){

	TankDesignVoteHandler.get = function(req, res){
		RequestHelper.createRequestSummary(req);
	    return TankDesignVoteDA.queryDesignVotes().then((designVotes) => {
	    	res.send({status: 200, data: designVotes});
	    });
	}

	TankDesignVoteHandler.post = function(req, res){
	    var requestSummary = RequestHelper.createRequestSummary(req);
	    console.log('made post request for tank design votes');
	     // console.log(Object.keys(req));
	    var votes = [{
	    	id: req.body['id'],
	    	design: req.body['design'],
	    	firstName: req.body['firstname'],
	    	lastName: req.body['lastname']
	    }];


	    if(votes[0].design == null || votes[0].firstName == null || votes[0].lastName == null){
	        res.status('500').send('You must populate all fields');
	    }else if(!!requestSummary.cookies[DESIGN_VOTE]){
	        res.status('500').send('You have already submitted a vote');
	    }else{
	    	return TankDesignVoteDA.insertDesignVotes(votes).then(() => {
			    console.log('added vote for ' + votes[0].design);
			    console.log('trying to set cookie for ' + DESIGN_VOTE);
			    res.cookie(DESIGN_VOTE, votes[0].design, {expire: 360000 + Date.now()});
			    console.dir(res.cookies);
				res.send('Your vote has been submitted successfully');

	    	}).catch((error) => {

	    		let errorText = 'Something went wrong.  Please try again later';
	    		if(!!error.detail){
	    			console.log(error.detail);
	    			if(error.detail.includes('already exists')){
	    				errorText = 'You have already submitted a vote';
	    			}
	    		}
	    		throw {code: 500, message: errorText};

	    	});
	    }

	}

	return TankDesignVoteHandler;

})(TankDesignVoteHandler || {});

module.exports = TankDesignVoteHandler;