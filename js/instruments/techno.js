class Techno {
	constructor(socket) {
		this.socket = socket;

		this.lastTime = Date.now();

		// In milliseconds
		this.delay = 100;

		this.first = true;

		this.audio = new Wad({
			source  : 'square',
			volume  : 1.0,   // Peak volume can range from 0 to an arbitrarily high number, but you probably shouldn't set it higher than 1.
			loop    : false, // If true, the audio will loop. This parameter only works for audio clips, and does nothing for oscillators.
			pitch   : 'A4',  // Set a default pitch on the constuctor if you don't want to set the pitch on play().
			detune  : 0,     // Set a default detune on the constructor if you don't want to set detune on play(). Detune is measured in cents. 100 cents is equal to 1 semitone.
			panning : -.5,    // Horizontal placement of the sound source. Possible values are from 1 to -1.
			env     : {      // This is the ADSR envelope.
				attack  : 0.1,  // Time in seconds from onset to peak volume.  Common values for oscillators may range from 0.05 to 0.3.
				decay   : 0.1,  // Time in seconds from peak volume to sustain volume.
				sustain : 0.3,  // Sustain volume level. This is a percent of the peak volume, so sensible values are between 0 and 1.
				hold    : 0.1, // Time in seconds to maintain the sustain volume level. If this is not set to a lower value, oscillators must be manually stopped by calling their stop() method.
				release : 0.1     // Time in seconds from the end of the hold period to zero volume, or from calling stop() to zero volume.
			}
		})
	}

	process(frame) {
		frame.hands.forEach((hand, index) => {
			var handX = hand.palmPosition[0],
				handY = hand.palmPosition[1],
				handZ = hand.palmPosition[2];

			this.delay = handX + 200;

			let currentTime = Date.now();
			if (currentTime >= this.lastTime + this.delay) {
				this.lastTime = currentTime;

				let freq = handY * 2 + 100;
				console.log(freq);

				this.socket.emit('play', {
					freq: freq
				});
			}
		});
	}

	play(data) {
		if (!this.first) {
			this.audio.stop();
			this.first = false;
		}
		this.audio.play({pitch: data.freq});

		var drawConfig = {color: "#F81E1E", fill: false, concentric: true};
		drawCircle(drawConfig);
	}
}