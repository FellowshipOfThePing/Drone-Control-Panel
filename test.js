// ----- Acquire Drone ----- //
var arDrone = require('ar-drone');
var client = arDrone.createClient();
client.config('general:navdata_demo', 'FALSE');
console.log(client);

// ------ Create Repl ----- //
//client.createRepl();



// ----- Data Streams ----- //
// var videoStream = client.getVideoStream();
// videoStream.on('data', console.log);

// var pngStream = client.getPngStream();
// pngStream.on('data', console.log);

client.on('navdata', (data) => {
	console.log(data.demo.batteryPercentage);
});



// ------- Base Script ------- //
// client.takeoff();

// client
//   .after(5000, function() {
//     this.clockwise(0.5);
//   })
//   .after(3000, function() {
//     this.animate('flipLeft', 15);
//   })
//   .after(1000, function() {
//     this.stop();
//     this.land();
//   })

