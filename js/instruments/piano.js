class Drums {
	constructor() {
		this.handOnCooldown = {};
	}

	process(frame) {
		var _self = this;
		frame.hands.forEach(function(hand, index) {
			if (hand.palmVelocity[1] < -400 && !this.handOnCooldown[hand.id]) {
				var handX = hand.palmPosition[0],
					handZ = hand.palmPosition[2];

				var data = {};
				if (handX < -225 && handX > -250){
					data.key = 130.813;
				}
				else if (handX < -200){
					data.key = 146.832;
				}
				else if (handX < -175){
					data.key = 164.814;
				}
				else if (handX < -150){
					data.key = 174.614;
				}
				else if (handX < -125){
					data.key = 194.998
				}
				else if (handX < -100){
					data.key = 246.942
				}
				else if (handX < -75){
					data.key = 261.626
				}
				else if (handX < -50){
					data.key = 293.66
				}
				else if (handX < 50){
					data.key = 329.628
				}
				else if (handX < 75){
					data.key = 349.228
				}
				else if (handX < 125){
					data.key = 391.995
				}
				else if (handX < 175){
					data.key = 440.000
				}
				else if (handX < 200) {
					data.key = 493.883
				}
				else if (handX < 225) {
					data.key = 493.883
				}

				//sendInstrumentData(data);
				console.log(data);
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
