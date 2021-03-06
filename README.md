AR-Drone Control Panel
==========================

A browser-based control panel application for the Parrot AR Drone 2.0.

### UI View ###

![UI_View](https://github.com/FellowshipOfThePing/Drone-Control-Panel/blob/master/images/screencap.jpg)



### Resources ###

Building off of the following repositories (with slight modifications):
 * [node-ar-drone](https://github.com/felixge/node-ar-drone)
 * [dronestream](https://github.com/bkw/node-dronestream)


Built using:
 * [Node.js](https://nodejs.org/en/docs/)
 * [Express.js](https://expressjs.com/en/4x/api.html)
 * [socket.io](https://github.com/socketio/socket.io)


Available Commands Include:
 * Takeoff
 * Land
 * Spin
 * Stop & Hover
 * Toggle Emergency Mode


Available Data Includes:
 * Front-Facing Video Feed
 * Flight Status
 * Battery
 * Emergency Mode Status
 * Altitude
 * Airspeed
 * System Errors
 * See ar-drone [docs](https://github.com/felixge/node-ar-drone/blob/master/docs/NavData.md) for more data options.


Improvements to be Made:
 * Implement Emergency Mode Toggle Functionality
 * Facial Recognition and "Follow-Me" Mechanic
 * Facial Authentication
 * Voice Commands
 * Add npm package
 * Just Make It Prettier...
 * Rebuild UI with React (Just for the heck of it?)
 * I should probably start putting these in a seperate Todo list...
