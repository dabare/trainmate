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


//exports.start = startServer;
