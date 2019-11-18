//Controller server - SERVER SIDE

//New express app for controller
var express = require('express');
var app2 = express();

// new server
var http2 = require('http').createServer(app2);

//Init socket.io with HTTP server
var io2 = require('socket.io')(http2);

http2.listen(3002, function(){
    console.log('Listening on *:3002');
});

io2.on('connection', function (socket) {
    var arDrone = require('ar-drone');
    var client = arDrone.createClient();

    setInterval(function(){
        var batteryLevel = client.battery();
        socket.emit('event', { name: 'battery',value: batteryLevel});
    }, 5000);

    socket.on('event', function (data) {
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
});

module.exports