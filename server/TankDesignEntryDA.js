var RequestHelper = require('./RequestHelper');
var AWSConnector = require('./awsconnector');
var DBConnector = require('./dbconnector');

var TankDesignEntryDA = (function(TankDesignEntryDA){


	TankDesignEntryDA.retrieveAllDesignFiles = function(retrieveFileData){

		return new Promise((resolve, reject) => {
			DBConnector.query('SELECT id, designname, designer, email, extension FROM tankdesign WHERE designer != \'test\';').then(designs => {
				designFiles = [];
				for(let design of designs){
					designFiles.push({id: design.id, fileName: design.id + '.' + design.extension, designer: design.designer, designname: design.designname});
				}
				console.log(retrieveFileData);
				if(!retrieveFileData){
					resolve(designFiles);
				}

				let bucketName = 'ultimate-summer-party';

				let i = 0;
				for(let design of designFiles){

					let fileName = design.fileName;
					console.log('reading from ' + fileName + '...');
					AWSConnector.getObject(bucketName, 'TankDesigns-web/' + fileName).then(data => {
						console.log('finished reading ' + fileName);
						design.data = data;
						if(i == designFiles.length - 1){
							resolve(designFiles);
						}
						i++;
					}).catch((err) => {
						console.dir(err);
						console.log('Object ' + fileName + ' could not be retrieved');
						if(i == designFiles.length - 1){
							resolve(designFiles);
						}
						i++;
					});
				}



			}).catch((err) => {
				console.dir(err);
				throw {code: 500, message: 'The server could not fetch the requested data from the database'};
			})

		});
	}

	TankDesignEntryDA.retrieveDesignFiles = function(ids){
		console.log('in retrieve design files');
		return new Promise((resolve, reject) => {
			let queryString = 'SELECT id, designname, designer, email, extension FROM tankdesign WHERE designer != \'test\' AND (';
			for(let i = 0; i < ids.length; i++){

				queryString += ' id = \'' + escape(ids[i]) + '\' ';
				if(i < ids.length - 1){
					queryString += ' OR ';
				}else{
					queryString += ')'
				}
			}
			console.log(queryString);
			DBConnector.query(queryString).then(designs => {
				designFiles = [];
				for(let design of designs){
					designFiles.push({id: design.id, fileName: design.id + '.' + design.extension, designer: design.designer, designname: design.designname});
				}

				let bucketName = 'ultimate-summer-party';

				let i = 0;
				for(let design of designFiles){

					let fileName = design.fileName;
					console.log('reading from ' + fileName + '...');
					AWSConnector.getObject(bucketName, 'TankDesigns-web/' + fileName).then(data => {
						console.log('finished reading ' + fileName);
						design.data = data;
						if(i == designFiles.length - 1){
							resolve(designFiles);
						}
						i++;
					}).catch((err) => {
						console.dir(err);
						console.log('Object ' + fileName + ' could not be retrieved');
						if(i == designFiles.length - 1){
							resolve(designFiles);
						}
						i++;
					});
				}

			}).catch((err) => {
				console.dir(err);
				throw {code: 500, message: 'The server could not fetch the requested data from the database'};
			})

		});

		//get design from bucket on s3 server
	}

	TankDesignEntryDA.uploadDesignFile = function(designUploads){
		let fileObject = {fileName: designUploads[0].fileName, body: designUploads[0].body};
		return AWSConnector.upload(designUploads[0].bucketName, fileObject).then((data) => {
			console.log('file uploaded to S3');
			var queryString = 'INSERT INTO tankdesign (id, designname, designer, email, extension) VALUES ';
			
			designUploads.forEach((designUpload, index) => {

				queryString += '(\'' + escape(designUpload.id) + '\', \'' + escape(designUpload.designName) + '\', \'' + escape(designUpload.designer) + '\', \'' + escape(designUpload.email) +'\', \'' + escape(designUpload.extension) + '\')'

				if(index == designUploads.length - 1){
					queryString += ';';
				}else{
					queryString += ',';
				}

			});

			console.log(queryString);
		    return DBConnector.query(queryString).catch((err) => {
		    	console.log('an error occurred saving the lines to the postgres db');
			    console.dir(err);
		        return AWSConnector.deleteBucketObject(designUploads[0].bucketName, fileObject).then((data) => {
			        throw {code:500, message: "AMAZON S3 Object Deleted"};
		        });
		    });
		});


	}

	return TankDesignEntryDA;

})(TankDesignEntryDA || {});

module.exports = TankDesignEntryDA;