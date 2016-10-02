class Guitar {
	constructor(socket) {
		this.socket = socket;
		this.audio = {
			string: new Wad({
				// source: './data/guitar/6thstring.wav',
				source: 'sawtooth',
				pitch: 'E2',
				// tuna   : {
				// 	// Overdrive : {
				// 	//     outputGain: 0.5,         //0 to 1+
				// 	//     drive: 0.7,              //0 to 1
				// 	//     curveAmount: 1,          //0 to 1
				// 	//     algorithmIndex: 0,       //0 to 5, selects one of our drive algorithms
				// 	//     bypass: 0
				// 	// },
				// },
				// source: 'triangle',
				// pitch: 'E1',
				env: {
					attack  : 0.2,  // Time in seconds from onset to peak volume.  Common values for oscillators may range from 0.05 to 0.3.
			        decay   : 0.3,  // Time in seconds from peak volume to sustain volume.
			        sustain : 0.2,  // Sustain volume level. This is a percent of the peak volume, so sensible values are between 0 and 1.
			        hold    : .75, // Time in seconds to maintain the sustain volume level. If this is not set to a lower value, oscillators must be manually stopped by calling their stop() method.
			        release : 1.25     // Time in seconds from the end of the hold period to zero volume, or from calling stop() to zero volume.
			    },
				vibrato : { // A vibrating pitch effect.  Only works for oscillators.
				        shape     : 'sawtooth', // shape of the lfo waveform. Possible values are 'sine', 'sawtooth', 'square', and 'triangle'.
				        magnitude : 1,      // how much the pitch changes. Sensible values are from 1 to 10.
				        speed     : 2,      // How quickly the pitch changes, in cycles per second.  Sensible values are from 0.1 to 10.
				        attack    : 0       // Time in seconds for the vibrato effect to reach peak magnitude.
				    },
			})
		};
	}

	process(frame) {
		let playing = false;
		console.log("Processing hands ");
		let playData = {};
		frame.hands.forEach((hand, index) => {

			var type = hand.type;
			if(type == "left") {

			} else {
				console.log("Processing right hand");
				if (hand.pinchStrength > .5) {
					playing = true;
				}
			}
		});
		if (playing) {
			this.socket.emit('play', playData);
		}
	}

	play(playData) {
		console.log("Playing");
		this.audio.string.play({
		});
	}
}
