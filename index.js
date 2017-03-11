var http = require('http');
var server = require("./server");
var router = require("./route");
var requestHandlers = require("./requestHandlers");

/*var debug = false;

var handle = {}
handle["/"] = requestHandlers.sendInterface;
handle["/interface"] = requestHandlers.sendInterface;

server.start(router.route,handle,debug);*/



http.createServer(function (req, res) {

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello, world!');

}).listen(process.env.PORT || 8080);
