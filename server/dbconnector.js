const { Client } = require('pg');
var dbconnector = (function(dbconnector){

	dbconnector.createDBConnection = function(){
		const client = new Client({
			connectionString: process.env.DATABASE_URL,
			ssl: true,
		});

		client.connect();
		return client;
	}

	dbconnector.query = function(queryString){
		return new Promise((resolve, reject) => {
			let client = dbconnector.createDBConnection();
			client.query(queryString, (err, res) => {

				if (err){
					console.log(err);
					client.end();
					reject(err);

				}else{
					console.log('accessed DB');
					client.end();
					resolve(res.rows);
				}

			});
		});
	}

	return dbconnector;

})(dbconnector || {});

module.exports = dbconnector;