class Drums {
	constructor(socket) {
		this.socket = socket;
		this.audio = {
			tom: new Wad({source: './data/lowTom.wav'}),
			hiHat: new Wad({source: './data/hiHat.wav'}),
			kick: new Wad({source: './data/kick.wav'}),
			snare: new Wad({source: './data/snare.wav'})
		};
		this.alreadyPlayed = {};

		console.log("Creating drums");
	}

	determineDrumType(handX, handZ) {
		let type = '';
		if (handX > 0 && handZ > 0) {
			// Bottom right drum
			type = "kick";
		}
		else if (handX > 0 && handZ < 0) {
			// Top right drum
			type = "hiHat";
		}
		else if (handX < 0 && handZ > 0) {
			// Bottom left drum
			type = "snare";
		}
		else if (handX < 0 && handZ < 0) {
			// Top left drum
			type = "tom";
		}
		return type;
	}

	process(frame) {
		frame.hands.forEach((hand, index) => {
			var handX = hand.palmPosition[0],
				handY = hand.palmPosition[1],
				handZ = hand.palmPosition[2];
			if (!this.alreadyPlayed[index] && hand.palmVelocity[1] < -200) {
				var data = {
					instrument: 'drums',
					volume: hand.palmVelocity[1],
					type: this.determineDrumType(handX, handZ)
				};

				this.socket.emit('play', data);
				this.alreadyPlayed[index] = true;

				var drawConfig = {color: "#006699"};
				drawCircle(drawConfig);
			}
			if (this.alreadyPlayed[index] && hand.palmVelocity[1] > 20) {
				this.alreadyPlayed[index] = false;
				console.log('reset');
			}
		});
	}

	play(data) {
		this.audio[data.type].play();
	}
}
