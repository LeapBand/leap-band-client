/**
 * Created by cferrier on 10/1/2016.
 *
 * 
 */
var socket = io('http://localhost:3000');

// client instrument dictionary

var members = {};
// sending info

//use this when changing instrument
socket.emit('update_member',{username:username, instrument:inst});

//whatever client needs to play music
socket.emit('play',{});

// taking info
socket.on('play', function(data) {
	console.log(data);
});

// update the members
socket.on('members_update', function(data) {
	members = data;
});


//functions called from leap
var sendInstrumentData(instData) = function(data){
	socket.emit('play', data);
};
