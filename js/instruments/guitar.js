class Guitar {
	constructor(socket) {
		this.socket = socket;
		// this.guitarSettings = {
		// 	source: 'sawtooth',
		// 	volume: 0.1,
		// 	env: {
		// 		attack  : 0.1,  // Time in seconds from onset to peak volume.  Common values for oscillators may range from 0.05 to 0.3.
		//         decay   : 0.3,  // Time in seconds from peak volume to sustain volume.
		//         sustain : 0.2,  // Sustain volume level. This is a percent of the peak volume, so sensible values are between 0 and 1.
		//         hold    : .75, // Time in seconds to maintain the sustain volume level. If this is not set to a lower value, oscillators must be manually stopped by calling their stop() method.
		//         release : 1.25     // Time in seconds from the end of the hold period to zero volume, or from calling stop() to zero volume.
		//     },
		// 	vibrato : { // A vibrating pitch effect.  Only works for oscillators.
		// 	        shape     : 'sawtooth', // shape of the lfo waveform. Possible values are 'sine', 'sawtooth', 'square', and 'triangle'.
		// 	        magnitude : 1,      // how much the pitch changes. Sensible values are from 1 to 10.
		// 	        speed     : 0.1,      // How quickly the pitch changes, in cycles per second.  Sensible values are from 0.1 to 10.
		// 	        attack    : 0       // Time in seconds for the vibrato effect to reach peak magnitude.
		// 	},
		// };
		this.handReleased = true;
		this.audio = {
			string: new Wad({
				// source: './data/guitar/6thstring.wav',
				pitch: 'E2',
				source: 'sawtooth',
				volume: 0.5,
				env: {
					attack  : 0.1,  // Time in seconds from onset to peak volume.  Common values for oscillators may range from 0.05 to 0.3.
					decay   : 0.3,  // Time in seconds from peak volume to sustain volume.
					sustain : 0.2,  // Sustain volume level. This is a percent of the peak volume, so sensible values are between 0 and 1.
					hold    : .75, // Time in seconds to maintain the sustain volume level. If this is not set to a lower value, oscillators must be manually stopped by calling their stop() method.
					release : 1.25     // Time in seconds from the end of the hold period to zero volume, or from calling stop() to zero volume.
				},
				vibrato : { // A vibrating pitch effect.  Only works for oscillators.
						shape     : 'sawtooth', // shape of the lfo waveform. Possible values are 'sine', 'sawtooth', 'square', and 'triangle'.
						magnitude : 1,      // how much the pitch changes. Sensible values are from 1 to 10.
						speed     : 0.1,      // How quickly the pitch changes, in cycles per second.  Sensible values are from 0.1 to 10.
						attack    : 0       // Time in seconds for the vibrato effect to reach peak magnitude.
				},
			})
		};
		this.currentKey = 'Em';
		this.keys = {
			C: {
				scales: {
					major: [
						'C2',
						'D2',
						'E2',
						'F2',
						'G2',
						'A3',
						'B3',
						'C3'
					],
					minor: [
						'C2',
						'D2',
						'Eb2',
						'F2',
						'G2',
						'A3',
						'B3',
						'C3'
					],
				}
			},
			Em: {
				scales: {
					minor: [
						"E2",
						"G2",
						"Bb2",
						"B2",
						"D3",
						"E3",
						"G3",
						"Bb3",
						"B3",
						"D4",
						"E4",
						"G4",
						"Bb4",
						"B4"
					]
				}
			}
		};
	}

	process(frame) {
		let playing = false;
		// console.log("Processing hands ");
		let playData = {
			notes: [
				// {
				// 	pitch: 'C3'
				// },
				// {
				// 	pitch: 'E3'
				// },
				// {
				// 	pitch: 'G3'
				// }
			]
		};
		frame.hands.forEach((hand, index) => {

			var type = hand.type;
			if(type == "left") {
				let yPos = hand.palmPosition[1];

				// let index = this.convertYToIndex(yPos, 14, 50, 500);
				let currentScale = this.keys[this.currentKey].scales.minor;
				let index = Math.floor(scale(80, 400, 0, currentScale.length - 1, yPos));
				// console.log("Ypos " + yPos);
				// console.log("Adding " + this.keys[this.currentKey].scales.major[index]);
				playData.notes.push({
					pitch: currentScale[index]
				});

			} else {
				if (hand.pinchStrength <= 0.40) {
					this.handReleased = true;
				} else if (hand.pinchStrength > .40 && this.handReleased) {
					this.handReleased = false;
					playing = true;
				}
			}
		});
		if (playing) {
			this.socket.emit('play', playData);
		}
	}

	play(playData) {
		// console.log(playData);
		this.audio.string.stop('lastPlayed');
		playData.notes.forEach((note, index) => {
			// console.log('Playing ' + note.pitch);
			this.audio.string.play({
				pitch: note.pitch,
				label: 'lastPlayed'
			});
		});

		var drawConfig = {color: "#CE3424", fill: false, concentric: true, rate: .5};
		drawCircle(drawConfig);
	}

	convertYToIndex(yPos, arraySize, minY, maxY) {
		let intervalSize = (maxY - minY) / arraySize;
		let index = Math.floor(((yPos / intervalSize))) % arraySize;
		// console.log("Calculated index1 " + index);
		if (yPos < minY) {
			index = 0;
		} else if (yPos > maxY) {
			index = arraySize - 1;
		}
		// console.log("Calculated index2 " + index);
		return index;
	}
}
