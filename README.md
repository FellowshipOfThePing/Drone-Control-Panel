AR-Drone Control Panel
==========================

A browser-based control panel application for the Parrot AR Drone 2.0.

Building off of the following repositories (with slight modifications):
 * [node-ar-drone](https://github.com/felixge/node-ar-drone)
 * [dronestream](https://github.com/bkw/node-dronestream)
 * [socket.io](https://github.com/socketio/socket.io)


Built using:
 * [Node.js](https://nodejs.org/en/docs/)
 * [Express.js](https://expressjs.com/en/4x/api.html)


Available Commands Include:
 * Takeoff
 * Land
 * Spin
 * Stop & Hover
 * Toggle Emergency Mode


Available Data Includes:
 * Altitude
 * Battery
 * Flight Status
 * Front-Facing Video Feed
 * See ar-drone [docs](https://github.com/felixge/node-ar-drone/blob/master/docs/NavData.md) for more data options.

Possible Improvements to be Made:
 * Facial Recognition and "Follow-Me" Mechanic
 * Facial Authentication
 * Voice Commands
 * Rebuild UI with React (Just for the heck of it?)
