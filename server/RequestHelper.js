var RequestHelper = (function(RequestHelper){

	RequestHelper.createRequestSummary = function(req){
	    var requestSummary = {
	        params: req.query,
	        body: req.body,
	        headers: req.headers,
	        cookies: req.cookies
	    }

	    var keys = Object.keys(requestSummary.params);
	    for(var i = 0; i < keys.length; i++){
	        var key = keys[i];
	        requestSummary.params[key] = requestSummary.params[key].replace(/ /g, '+');
	    }

	    if(!!req.query && !!req.query.actionType){
	        requestSummary.actionType = req.query.actionType;
	    }

	    return requestSummary;
	}

	
	return RequestHelper;

})(RequestHelper || {});

module.exports = RequestHelper;