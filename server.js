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
