/**
 * Created by cferrier on 10/1/2016.
 *
 * 
 */
var socket = io('http://localhost:3000');
var members = {};
// client instrument dictionary

// changing instrument
var changeInstrument = function(instName){
	socket.emit('update_member', 
		{username: username, instrument: instName});
};
// play note
var sendInstrumentData = function(data){
	data.username = username;
	socket.emit('play', data);
};

// taking info
socket.on('play', function(data) {
	members[data.id].instrument.play(data.data);
});

// update the member
socket.on('member_updated', function(data) {
	updateMember(data);
});

// member left
socket.on('member_left', function(data) {
	memberLeft(data);
});

