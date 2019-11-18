// Start Up Function - CLIENT SIDE
$(function () {

    // Drone Camera Feed
    function startStream() {
        new NodecopterStream(document.getElementById("stream"), {port: 3001});
    }

    // Drone Controls
    function startController() {
        var socket = io.connect('http://localhost:3002');
        socket.on('connect', () => {

            // listen for navdata, update UI with data
            socket.on('navdata', (data) => {

                // Connection Indicator - (Automatic upon recieving navdata)
                var status = $('#status');
                status.text('Connected');
                status.css('color', 'green');

                // UI Battery Indicator
                var battery = data.demo.batteryPercentage;
                var batteryIndicator = $('#battery');
                batteryIndicator.text(battery + '%');
                if (battery < 50) {
                    battery.css('color', 'red');
                };

                // 'Flying' Status Indicator
                var flying = data.droneState.flying;
                var flyingIndicator = $('#flying');
                if (flying === 1) {
                    flyingIndicator.text('Airborne');
                } else {
                    flyingIndicator.text('Landed');
                }

            });

            // Command Click Listeners
            $("#takeoff").click(() => {
                console.log("Sending Takeoff Command");
                socket.emit('command', {name:"takeoff"});
            });

            $("#spin").click(() => {
                console.log("Sending Spin Command");
                socket.emit('command', {name:"spin"});
            });

            $("#stop").click(() => {
                console.log("Sending Stop Command");
                socket.emit('command', {name:"stop"});
            });

            $("#land").click(() => {
                console.log("Sending Land Command");
                socket.emit('command', {name:"land"});
            });
        });
    }
    // Init Page
    startStream();
    startController();
});