class Piano {
	constructor(socket) {
		this.socket = socket;
		this.handOnCooldown = {};
		this.audio = new Wad({
			source:'sine',
			env:{
				attack:0,
				decay:0,
				hold:0.25,
				sustain:1.0,
				release:0
			}
		});

		this.alreadyPlayed = {};
		console.log("creating piano");
	}

	process(frame) {

		frame.hands.forEach((hand, index) => {

			var handX = hand.palmPosition[0],
				handZ = hand.palmPosition[2];
			if(!this.alreadyPlayed[index] && hand.palmVelocity[1] < -200){
				var data = {
					instrument: 'piano'
				};
				if (handX < -225 && handX > -250){
					data.freq = 130.813;
				}
				else if (handX < -200){
					data.freq = 138.591;
				}
				else if (handX < -180){
					data.freq = 146.832;
				}
				else if (handX < -160){
					data.freq = 155.563;
				}
				else if (handX < -140){
					data.freq = 164.814
				}
				else if (handX < -120){
					data.freq = 174.614
				}
				else if (handX < -100){
					data.freq = 184.997
				}
				else if (handX < -80){
					data.freq = 195.998
				}
				else if (handX < -60){
					data.freq = 207.652
				}
				else if (handX < -40){
					data.freq = 220.000
				}
				else if (handX < -20){
					data.freq = 233.082
				}
				else if (handX < 0){
					data.freq = 246.942
				}
				else if (handX < 20) {
					data.freq = 261.626
				}
				else if (handX < 40) {
					data.freq = 277.183
				}
				else if (handX < 60) {
					data.freq = 293.665
				}
				else if (handX < 80) {
					data.freq = 311.127
				}
				else if (handX < 100) {
					data.freq = 329.628
				}
				else if (handX < 120) {
					data.freq = 349.228
				}
				else if (handX < 140) {
					data.freq = 369.994
				}
				else if (handX < 160) {
					data.freq = 391.995
				}
				else if (handX < 180) {
					data.freq = 415.305
				}
				else if (handX < 200) {
					data.freq = 440.000
				}
				this.socket.emit('play', data);
				this.alreadyPlayed[index] = true;
			}

			if (this.alreadyPlayed[index] && hand.palmVelocity[1] > 20) {
				this.alreadyPlayed[index] = false;
				console.log('reset');
			}
		}
	)};

	play(data) {
		// this.audio.volume = data.volume;
		this.audio.play({pitch: data.freq});
		// this.audio.stop();

		// red circle
		var drawConfig = {color: "#990000"};
		drawCircle(drawConfig);
	}
}