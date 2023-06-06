var RequestHelper = require('./RequestHelper');
var DBConnector = require('./dbconnector');

var TankDesignVoteDA = (function(TankDesignVoteDA){

	TankDesignVoteDA.queryDesignVotes = function(voteId){
	    return DBConnector.query('SELECT id, design, firstName, lastName FROM DesignVotes;');
	}

	TankDesignVoteDA.insertDesignVotes = function(votes){
		var queryString = 'INSERT INTO DesignVotes (id, design, firstName, lastName) VALUES ';
		votes.forEach((vote, index) => {

			queryString += '(\'' + escape(vote.id) + '\', \'' + escape(vote.design) + '\', \'' + escape(vote.firstName) + '\', \'' + escape(vote.lastName) + '\')'

			if(index == votes.length - 1){
				queryString += ';';
			}else{
				queryString += ',';
			}
		});
		console.log(queryString);
	    return DBConnector.query(queryString);
	}

	return TankDesignVoteDA;

})(TankDesignVoteDA || {});

module.exports = TankDesignVoteDA;