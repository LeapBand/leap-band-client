var socket = io('http://localhost:3000');

var band = new Band(socket);
var myId = undefined;

// taking info
socket.on('play', function(data) {
	console.log(data);
	band.play(data);
});

var proc = function(frame, id) {};

socket.on('initialize', function(data) {
	myId = data.myId;
	band.initialize(data.clients);
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
	instrumentName: 'drums'
});


Leap.loop(function(frame) {
	proc.call(band, frame, myId);
});