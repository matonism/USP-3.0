var RequestHelper = require('./RequestHelper');
var TankDesignEntryDA = require('./TankDesignEntryDA');
const uuidv4 = require('uuid/v4');


var TankDesignEntryHandler = (function(TankDesignEntryHandler){

	const folderPath = 'TankDesigns/';
	const acceptableFileTypes = [
		'jpg',
		'png',
		'gif',
		'jpeg'
	];

	TankDesignEntryHandler.get = function(req, res){
	    var requestSummary = RequestHelper.createRequestSummary(req);
	    var ids = requestSummary.params['ids'];
	    console.log('ids: ' + ids);
	    if(!!ids){
	    	ids = unescape(ids).split(',');
	    }

	    if(ids[0] == 'all'){
		    return TankDesignEntryDA.retrieveAllDesignFiles(false).then((designSubmissions) => {
		    	console.log('Sending all tank design submissions to client...');
		    	res.send({status: 200, data: designSubmissions});
		    	console.log('All tank designs sent to client');
		    });
	    }else{
		    return TankDesignEntryDA.retrieveDesignFiles(ids).then((designSubmissions) => {
		    	res.send({status: 200, data: designSubmissions});
		    });
		}
	}

	TankDesignEntryHandler.post = function(req, res){
	    var requestSummary = RequestHelper.createRequestSummary(req);

		var bucketName = 'ultimate-summer-party';
		var designer = req.body['designer-name'];
		var designName = req.body['design-name'];
		var email = req.body['email'];
		var uuid = uuidv4();

		verifyFileExists(req.files);

		var filePathArray = req.files.tankDesignEntry.name.split('.');
		var fileExtension = filePathArray[filePathArray.length - 1];

		verifyFileType(fileExtension, filePathArray);
		verifyFileSize(req.files.tankDesignEntry.size);
		verifyNonNullEntries(designer, designName, email);

		var designUploads = [{
			bucketName: 'ultimate-summer-party',
			fileName: folderPath + uuid + '.' + fileExtension,
		 	body: req.files.tankDesignEntry.data,
			designName: designName, 
			designer: designer,
			email: email,
			id: uuid,
			extension: fileExtension
		}];

		return TankDesignEntryDA.uploadDesignFile(designUploads).then((data) => {
			console.log("Successfully uploaded data to " +  designUploads[0].bucketName + "/" + designUploads[0].fileName);
			res.send('The File was uploaded successfully. We will contact you at your provided email address (' + designUploads[0].email + ') if there are any concerns with your design');
		});

	}

	var verifyFileType = (fileExtension, filePathArray) => {
		if(!acceptableFileTypes.includes(fileExtension.toLowerCase()) || filePathArray.length <= 1){
			console.log('File type is not valid');
			throw {code: 500, message: "This is not an acceptable file type.  You must upload a JPG, PNG, or GIF"};
		}
	}


	var verifyFileSize = (fileSize) => {
		if(fileSize > 6 * 1024 * 1024){
			console.log('File size is not valid');
			throw {code: 500, message: "This is not an acceptable file size.  Files must be no larger than 20 MB"};
		}
	}

	var verifyFileExists = (files) => {
		if(!files.tankDesignEntry){
			console.log('No file was selected');
			throw {code: 500, message: "You must select a file to upload"};
		}
	}

	var verifyNonNullEntries = (designer, designName, email) => {
		if(!designer || !designName || !email){
			console.log('Fields were empty on submission');
			throw {code: 500, message: "You must populate all fields to submit your design"};
		}
	}

	return TankDesignEntryHandler;

})(TankDesignEntryHandler || {});

module.exports = TankDesignEntryHandler;