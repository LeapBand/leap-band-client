/**
 * Created by cferrier on 10/1/2016.
 *
 * 
 */
var socket = io('http://localhost:3000');

// client instrument dictionary

var members = {};
// sending info

// changing instrument
var changeInstrument = function(instName){
	socket.emit('update_member', {username: username, instrument: instName});
};
// play note
var sendInstrumentData(instData) = function(data){
	data.username = username;
	socket.emit('play', data);
};

// taking info
socket.on('play', function(data) {
	console.log(data);
});

// update the members
socket.on('members_update', function(data) {
	oldMembers = members;
	members = data;
	updateMemberInstruments(members)
});


/**
 * Created by cferrier on 10/1/2016.
 *
 * 
 */
var socket = io('http://localhost:3000');

// client instrument dictionary

var members = {};
// sending info

// changing instrument
var changeInstrument = function(instName){
	socket.emit('update_member', {username: username, instrument: instName});
};
// play note
var sendInstrumentData(instData) = function(data){
	data.username = username;
	socket.emit('play', data);
};

// taking info
socket.on('play', function(data) {
	console.log(data);
});

// update the members
socket.on('members_update', function(data) {
	oldMembers = members;
	members = data;
	updateMemberInstruments(members)
});


