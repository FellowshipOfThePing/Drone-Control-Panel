// Start Up Function - CLIENT SIDE
$(function () {

    // Drone Camera Feed
    function startStream() {
        new NodecopterStream(document.getElementById("stream"), {port: 3001});
    }

    // Drone Controls
    function startController(){
        var socket = io.connect('http://localhost:3002');
        socket.on('connect', function () {
            // var status = document.getElementById('status');
            // $('#status').text('Connected');
            // $('#status').css('color', 'green');

            // Remaining Battery Power
            socket.on('event', function (data) {
                if(data.name=="battery"){
                    $("#battery-indicator").css('width',data.value+'%');
                    $("#battery-value").html(data.value+'%');
                }
            });

            // Command Click Listeners
            $("#takeoff").click(function(){
                console.log("Sending Takeoff Command");
                socket.emit('event', {name:"takeoff"});
            });

            $("#spin").click(function(){
                console.log("Sending Spin Command");
                socket.emit('event', {name:"spin"});
            });

            $("#stop").click(function(){
                console.log("Sending Stop Command");
                socket.emit('event', {name:"stop"});
            });

            $("#land").click(function(){
                console.log("Sending Land Command");
                socket.emit('event', {name:"land"});
            });

        });
    }
    // Init Page
    startStream();
    startController();
});