class Drums {
	constructor(socket) {
		this.socket = socket;
		this.handOnCooldown = {};
		this.tom = new Wad({source : './data/lowTom.wav'});
		this.hiHat = new Wad({source : './data/hiHat.wav'});
		this.kick = new Wad({source : './data/kick.wav'});
		this.snare = new Wad({source : './data/snare.wav'});

		console.log("Creating drums");
	}

	process(frame) {
		frame.hands.forEach((hand, index) => {
			if (hand.palmVelocity[1] < -400 && !this.handOnCooldown[hand.id]) {
				var handX = hand.palmPosition[0],
					handZ = hand.palmPosition[2];
				var data = {
					instrument: "drums",
					volume: hand.palmVelocity[1]
				};
				if (handX > 0 && handZ > 0){
						//bottom right
						data.type = "kick";
				}
				else if (handX > 0 && handZ < 0){
						data.type = "hiHat";
				}
				else if (handX < 0 && handZ > 0){
					//Bottom Left Drum
					data.type = "snare";
				}
				else if (handX < 0 && handZ < 0){
					//Top Left Drum
					data.type = "tom";
				}

				this.socket.emit('play', data);
				this.toggleCooldown(hand.id);
				setTimeout(() => {
					this.toggleCooldown(hand.id)
				}, 250);
			}
		});
	}

	play(data) {
		if(data.type === "kick"){
			this.kick.play();
		}
		else if(data.type === "tom"){
			this.tom.play();
		}
		else if(data.type === "snare"){
			this.snare.play();
		}
		else if(data.type === "hiHat"){
			this.hiHat.play();
		}
	}

	toggleCooldown(hand) {
		this.handOnCooldown[hand] = !this.handOnCooldown[hand];
	}
}
