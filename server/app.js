const url = require('url');
const http = require('http');
const fs = require('fs');
const db = require('./dbconnector.js');

const app = http.createServer((request, response) => {
	var req = url.parse(request.url, true);
	var path = '.' + req.pathname;
	var query = req.query;
	console.log('path: '+ path);
	if(isRequestForValidResource(path)){
		if(isRequestForVideo(path)){

			console.log('request for video...');

			// var fileStream = fs.createReadStream(path);
			// response.writeHead(200, 
			// 	{
			// 		"Content-Type": "video/mp4",
			// 		'Access-Control-Allow-Origin': '*'
			// 	}
			// );
			// fileStream.pipe(response);
			// response.end();


			fs.stat(path, function(err, stats){
				if(!!err){
					if(err.code === 'ENOENT'){
						return response.sendStatus(404);
					}
					response.end(err);
				}

				var range = request.headers.range;
				if (!range) {
				   // 416 Wrong range
					return response.sendStatus(416);
				}
				var positions = range.replace(/bytes=/, "").split("-");
				var start = parseInt(positions[0], 10);
				var total = stats.size;
				var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
				var chunksize = (end - start) + 1;

				response.writeHead(206, {
					"Content-Range": "bytes " + start + "-" + end + "/" + total,
					"Accept-Ranges": "bytes",
					"Content-Length": chunksize,
					"Content-Type": "video/mp4",
					'Access-Control-Allow-Origin': '*'
				});

				var stream = fs.createReadStream(path, { start: start, end: end });
				stream.on("open", function() {
					stream.pipe(response);
				})
				stream.on("error", function(err) {
					response.end(err);
				});
			});

		}else if(isRequestForImage(path)){





			var fileStream = fs.createReadStream(path);
			response.writeHead(200, 
				{
					"Content-Type": "image/jpg",
					'Access-Control-Allow-Origin': '*'
				}
			);
			fileStream.pipe(response);
			response.end();



		}else{
			console.log('serving requested web page');
			db.queryDesignVotes();
			fs.readFile(path, function(err, data){
				if(!!data){
				
					sendHTMLToClient(response, data);
				}
				// else{

				// 	fs.readFile('index.html', function(err, data){
						
				// 		if(!data){
				// 			data = 'No page found';
				// 		}
				// 		sendHTMLToClient(response, data);
				// 	});
				// }
			});


		}
	}else{
		console.log('serving default web page');
		db.queryDesignVotes();
		console.log('finished query...');
		fs.readFile('./pages/index.html', function(err, data){
			console.log('inside file read');
			if(!!data){
				console.log('inside senddatatoclient')
				sendHTMLToClient(response, data);
			}
		});
	}
});

function sendHTMLToClient(response, data){
	console.log('Returning HTML Page...');
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(data);
	response.end();
}
function sendImageToClient(response, data){
	console.log('Returning Image...');
	response.writeHead(200, 
		{
			"Content-Type": "image/jpg",
			"Content-Length": Buffer.byteLength(data)
		}
	);
	response.write(data);
	response.end();
}
function isRequestForVideo(path){
	var pathArray = path.split('.');
	var fileEnding = pathArray[pathArray.length - 1];
	return (
		fileEnding == 'mp4' 
	);
}

function isRequestForImage(path){
	var pathArray = path.split('.');
	var fileEnding = pathArray[pathArray.length - 1];
	return (
		fileEnding == 'jpg' 
		|| fileEnding == 'jpeg' 
		|| fileEnding == 'gif' 
		|| fileEnding == 'png'
	);
}

function isRequestForValidResource(path){
	var pathArray = path.split('.');
	var fileEnding = pathArray[pathArray.length - 1];
	return (
		fileEnding == 'jpg' 
		|| fileEnding == 'jpeg' 
		|| fileEnding == 'gif' 
		|| fileEnding == 'png'
		|| fileEnding == 'html'
		|| fileEnding == 'txt'
		|| fileEnding == 'mp4'
	);
}
var PORT = process.env.PORT || 5000;
app.listen(PORT);