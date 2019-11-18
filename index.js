// Initialize Express as function handler for HTTP server
var express = require('express');
var app = express();


// Init Server
var http = require('http').createServer(app);


//Init socket.io with HTTP server
var io = require('socket.io')(http);


//Include css and js files
app.use("/assets", express.static(__dirname + '/assets'));


//Route Handler for control panel
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});


//Dronestream creates its own server and listens
require("dronestream").listen(3001, function() {
	console.log('Listening on *:3001');
});


//Controller
require("./drone/controller");


//Make the http server listen on port 3000
http.listen(3000, function(){
	console.log('listening on *:3000');
});


