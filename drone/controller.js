//Controller server - SERVER SIDE

// New express app for controller
var express = require('express');
var app2 = express();

// New server
var http2 = require('http').createServer(app2);

// Init socket.io with HTTP server
var io2 = require('socket.io')(http2);

// Listen for Controller Feed
http2.listen(3002, function(){
    console.log('Listening on *:3002 for Controller Feed ');
});

// Connection listener
io2.on('connection', function (socket) {
    var arDrone = require('ar-drone');
    var client = arDrone.createClient();
    client.config('general:navdata_demo', 'FALSE');

    // Emit Realtime UI Updates from drone.client (battery %, connection status, flying status, etc.)
    setInterval(() =>  {
        client.on('navdata', (data) => {
            socket.emit('navdata', data);
        });
    }, 15000);

    // Listen for commands from client
    socket.on('command', function (data) {
        if(data.name=="takeoff"){
            console.log("Takeoff Command Sent");
            client.takeoff();
        }
        if(data.name=="spin"){
            console.log("Spin Command Sent");
            client.clockwise(1);
        }
        if(data.name=="stop"){
            console.log("Stop Command Sent");
            client.stop();
        }
        if(data.name=="land"){
            console.log("Land Command Sent");
            client.land();
        }
    });

	// Log disconnections to console
	socket.on('disconnect', () => {
		console.log('User disconnected from controller');
	});
});

module.exports