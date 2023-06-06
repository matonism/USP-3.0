var RequestHelper = require('./RequestHelper');
var TankDesignVoteStandingsDA = require('./TankDesignVoteStandingsDA');

var DESIGN_VOTE = 'design-vote';

var TankDesignVoteStandingsHandler = (function(TankDesignVoteStandingsHandler){

	TankDesignVoteStandingsHandler.get = function(req, res){
		RequestHelper.createRequestSummary(req);
	    return TankDesignVoteStandingsDA.queryDesignVoteStandings().then((designVotes) => {
	    	res.send({status: 200, data: designVotes});
	    });
	}

	return TankDesignVoteStandingsHandler;

})(TankDesignVoteStandingsHandler || {});

module.exports = TankDesignVoteStandingsHandler;