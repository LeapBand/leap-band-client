//var socket = io('http://130.85.245.80:3000');
var socket = io('http://localhost:3000');
//eric 130.85.245.80
var band = new Band(socket);

// taking info
socket.on('play', function(data) {
	// console.log(data);
	band.play(data);
});

var proc = function(frame, id) {};

socket.on('initialize', function(data) {
	band.initialize(data.clients, data.myId);
	proc = band.process;
});

// update the member
socket.on('member_updated', function(data) {
	band.updateMember(data);
});

// member left
socket.on('member_left', function(data) {
	band.removeMember(data);
});

socket.emit('update_member', {
	username: 'testuser',
	instrumentName: 'techno'
});

band.watchInstrument(function(name) {
	console.log('Instrument changed: ' + name);
	showInstrument(name);
});

Leap.loop(function(frame) {
	proc.call(band, frame);
});