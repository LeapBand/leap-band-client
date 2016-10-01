class Drums {
	constructor() {
		this.handOnCooldown = {};
	}

	process(frame) {
		var _self = this;
		frame.hands.forEach(function(hand, index) {
			if (hand.palmVelocity[1] < -400 && !handOnCooldown[hand.id]) {
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

				sendInstrumentData(data);

				this.toggleCooldown(hand.id);
				setTimeout(function(){
					_self.toggleCooldown(hand.id)
				}, 250);
			}

		});
	}

	play(data) {

	}

	toggleCooldown(hand) {
		this.handOnCooldown[hand] = !this.handOnCooldown[hand];
	}
}
