var RequestHelper = require('./RequestHelper');
var DBConnector = require('./dbconnector');

var TankDesignVoteStandingsDA = (function(TankDesignVoteStandingsDA){

	TankDesignVoteStandingsDA.queryDesignVoteStandings = function(voteId){
	    return DBConnector.query('SELECT design, COUNT(\'design\') AS votecount ' +
	    ' FROM public.designvotes AS dv ' + 
	    ' GROUP BY dv.design ' + 
	    ' ORDER BY votecount DESC;');
	}

	return TankDesignVoteStandingsDA;

})(TankDesignVoteStandingsDA || {});

module.exports = TankDesignVoteStandingsDA;