class Techno {
	constructor(socket) {
		this.socket = socket;

		this.lastTime = Date.now();

		this.currentHand = 0;

		// In milliseconds
		this.delay = 100;

		this.first = true;

		this.audio = new Wad({
			source  : 'square',
			volume  : 0.4,   // Peak volume can range from 0 to an arbitrarily high number, but you probably shouldn't set it higher than 1.
			loop    : false, // If true, the audio will loop. This parameter only works for audio clips, and does nothing for oscillators.
			pitch   : 'A4',  // Set a default pitch on the constuctor if you don't want to set the pitch on play().
			detune  : 0,     // Set a default detune on the constructor if you don't want to set detune on play(). Detune is measured in cents. 100 cents is equal to 1 semitone.
			panning : 0,    // Horizontal placement of the sound source. Possible values are from 1 to -1.
			env     : {      // This is the ADSR envelope.
				attack  : 0.1,  // Time in seconds from onset to peak volume.  Common values for oscillators may range from 0.05 to 0.3.
				decay   : 0.1,  // Time in seconds from peak volume to sustain volume.
				sustain : 0.3,  // Sustain volume level. This is a percent of the peak volume, so sensible values are between 0 and 1.
				hold    : 0.1, // Time in seconds to maintain the sustain volume level. If this is not set to a lower value, oscillators must be manually stopped by calling their stop() method.
				release : 0.1     // Time in seconds from the end of the hold period to zero volume, or from calling stop() to zero volume.
			}
			// vibrato : { // A vibrating pitch effect.  Only works for oscillators.
			// 	shape     : 'sine', // shape of the lfo waveform. Possible values are 'sine', 'sawtooth', 'square', and 'triangle'.
			// 	magnitude : 50,      // how much the pitch changes. Sensible values are from 1 to 10.
			// 	speed     : 3,      // How quickly the pitch changes, in cycles per second.  Sensible values are from 0.1 to 10.
			// 	attack    : 0.02       // Time in seconds for the vibrato effect to reach peak magnitude.
			// }
		})
	}

	process(frame) {
		frame.hands.forEach((hand, index) => {
			if (this.currentHand >= frame.hands.length) {
				this.currentHand = 0;
			}
			if (this.currentHand == index) {
				++this.currentHand;
				if (this.currentHand >= frame.hands.length) {
					this.currentHand = 0;
				}

				var handX = hand.palmPosition[0],
					handY = hand.palmPosition[1],
					handZ = hand.palmPosition[2];

				// let something = scale(-100, 200, 0, 1, handZ);

				var wristRotation = Math.abs(hand.roll());
				var pitchAdjustment = scale(0, Math.PI, 0.2, 5.0, wristRotation);

				this.delay = scale(-280, 280, 50, 300, handX);

				let currentTime = Date.now();
				if (currentTime >= this.lastTime + this.delay) {
					// Only reset last time when on the last hand
					if (index === frame.hands.length - 1) {
						this.lastTime = currentTime;
					}

					// let freq = handY * 2 + 100;
					let freq = scale(200, 600, 200, 1500, handY) * pitchAdjustment;
					let rate = scale(100, 3000, 0.2, 5.0, freq);
					// console.log(freq);

					this.socket.emit('play', {
						freq: freq,
						rate: rate
					});
				}
			}

		});
	}

	play(data) {
		if (!this.first) {
			this.audio.stop();
			this.first = false;
		}
		this.audio.play({
			pitch: data.freq
		});

		var drawConfig = {
			color: "#FFFF00",
			fill: false,
			rate: data.rate
		};
		drawCircle(drawConfig);
	}
}