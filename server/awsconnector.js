// Load the SDK and UUID
var AWS = require('aws-sdk');

var awsconnector = (function(awsconnector){

  	var defaultBucket = 'ultimate-summer-party';

  	awsconnector.getObject = function(bucketName, fileName){

		if(bucketName == null){
			bucketName = defaultBucket
		}

		var objectParams = {Bucket: bucketName, Key: fileName};
		var downloadPromise = new AWS.S3({
			apiVersion: '2006-03-01',	
			accessKeyId: process.env.AWS_ACCESS_KEY,
			secretAccessKey: process.env.AWS_SECRET_KEY
		}).getObject(objectParams).promise();

		return downloadPromise;

	}

  	awsconnector.upload = function(bucketName, fileInfo){

		if(bucketName == null){
			bucketName = defaultBucket
		}

		var objectParams = {Bucket: bucketName, Key: fileInfo.fileName, Body: fileInfo.body};
		var uploadPromise = new AWS.S3({
			apiVersion: '2006-03-01',	
			accessKeyId: process.env.AWS_ACCESS_KEY,
			secretAccessKey: process.env.AWS_SECRET_KEY
		}).putObject(objectParams).promise();

		return uploadPromise;

	}

	awsconnector.deleteBucketObject = (bucketName, fileInfo) => {
		var params = {
			Bucket: bucketName, 
			Key: fileInfo.fileName
		};

		var deletePromise = new AWS.S3({
			apiVersion: '2006-03-01',	
			accessKeyId: process.env.AWS_ACCESS_KEY,
			secretAccessKey: process.env.AWS_SECRET_KEY
		}).deleteObject(params, function(err, data) {
			if (err){ 
				console.log(err, err.stack);
			}
			else{
				console.log(data);
			}          

		}).promise();

		return deletePromise;
	}



  	awsconnector.download = function(bucketName, fileInfo){

		// if(bucketName == null){
		// 	bucketName = defaultBucket
		// }

		// var objectParams = {Bucket: bucketName, Key: fileInfo.fileName, Body: fileInfo.body};
		// var uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();

		// return uploadPromise();

	}

  	awsconnector.createBucket = function(bucketName){

		var bucketPromise = new AWS.S3({apiVersion: '2006-03-01'}).createBucket({Bucket: bucketName}).promise();

		bucketPromise.then((data)=>{

		}).catch((err) => {
			console.error(err, err.stack);
		});
	}

  return awsconnector;

})(awsconnector || {});

module.exports = awsconnector;