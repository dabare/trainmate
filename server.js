var fs = require('fs'),
http = require('http'),
socketio = require('socket.io'),
url = require("url");
//SerialPort = require("serialport")

var socketServer;
var serialPort;
var portName = 'COM5'; //change this to your Arduino port
var sendData = "";

// handle contains locations to browse to (vote and poll); pathnames.
function startServer(route,handle,debug)
{
	// on request event
	function onRequest(request, response) {
	  // parse the requested url into pathname. pathname will be compared
	  // in route.js to handle (var content), if it matches the a page will
	  // come up. Otherwise a 404 will be given.
	  var pathname = url.parse(request.url).pathname;
	  console.log("Request for " + pathname + " received");
	  var content = route(handle,pathname,response,request,debug);
	}

	var httpServer = http.createServer(onRequest).listen(process.env.PORT || 8080, function(){
		console.log("Listening at: http://localhost:1337");
		console.log("Server is up");
	});
	//serialListener(debug);
	initSocketIO(httpServer,debug);
}

function initSocketIO(httpServer,debug)
{
	socketServer = socketio.listen(httpServer);
	if(debug == false){
		socketServer.set('log level', 1); // socket IO debug off
	}

	socketServer.on('connection', function (socket) {
	//console.log('connected');
	socket.emit('onconnection', {pollOneValue:sendData});
	socketServer.on('update', function(data) {
	socket.emit('updateData',{pollOneValue:data});
	});
	socket.on('message', function(data) {

		socketServer.emit('updates',data);

	});

    });
}

// Listen to serial port
exports.start = startServer;
