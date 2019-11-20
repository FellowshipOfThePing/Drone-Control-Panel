// Start Up Function - CLIENT SIDE
$(function () {

    // Init Camera Feed
    function startStream() {
        new NodecopterStream(document.getElementById("stream"), {port: 3001});
    }

    // Drone Controls
    function startController() {
        var socket = io.connect('http://localhost:3002');
        socket.on('connect', () => {

            // Track number of navdata iterations
            var data_loops = 0;
            
            // jquery DOM for data indicators to update
            var status = $('#status');
            var batteryIndicator = $('#battery');
            var flyingIndicator = $('#flying');
            var altitudeIndicator = $('#altitude');
            var airspeedIndicator = $('#airspeed');
            var errorsIndicator = $('#errors');

            // Listen for navdata, update UI with data
            socket.on('navdata', (data) => {

                if (data_loops === 0) {
                    status.text('Connected');
                    status.css('color', 'green');
                }

                // Update Battery Indicator
                var battery = data.demo.batteryPercentage;
                batteryIndicator.text(battery + '%');
                if (battery < 50) {
                    batteryIndicator.css('color', 'red');
                }

                // Update 'Flying' Status Indicator
                var flying = data.droneState.flying;

                if (flying === 1) {
                    flyingIndicator.text('Airborne');
                } else {
                    flyingIndicator.text('Landed');
                }

                // Update Altitude Meter
                var altitude = data.demo.altitude;
                altitudeIndicator.text(altitude);

                // Update Airspeed Meter
                var airspeed = data.demo.zVelocity;
                airspeedIndicator.text(airspeed);

                // Update Errors Monitor
                errorsIndicator.empty();
                var state = data.droneState;
                var errorsDict = {
                    // "Vision Enabled": state.visionEnabled, //TEMP for testing UI
                    // "Camera Ready": state.cameraReady, //TEMP for testing UI
                    "Magnometer Needs Calibration": state.MagnometerNeedsCalibration,
                    "Too Much Wind": state.tooMuchWind,
                    "Cutout Detected": state.cutoutDetected, 
                    "Emergency Landing": state.emergencyLanding
                };

                for (var key in errorsDict) {
                    if (errorsDict[key]) {
                        errorsIndicator.append("<li class='lead'>" + key + "</li>");
                    }
                };


                // Update Data Loops
                data_loops += 1;
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