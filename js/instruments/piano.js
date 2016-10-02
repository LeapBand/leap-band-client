class Drums {
	constructor() {
		this.handOnCooldown = {};
		this.note = T("sin");
	}

	process(frame) {
		var _self = this;
		frame.hands.forEach(function(hand, index) {
			if (hand.palmVelocity[1] < -400 && !this.handOnCooldown[hand.id]) {
				var handX = hand.palmPosition[0],
					handZ = hand.palmPosition[2];

				var data = {};
				if (handX < -225 && handX > -250){
					data.freq = 130.813;
				}
				else if (handX < -200){
					data.freq = 146.832;
				}
				else if (handX < -175){
					data.freq = 164.814;
				}
				else if (handX < -150){
					data.freq = 174.614;
				}
				else if (handX < -125){
					data.freq = 194.998
				}
				else if (handX < -100){
					data.freq = 246.942
				}
				else if (handX < -75){
					data.freq = 261.626
				}
				else if (handX < -50){
					data.freq = 293.66
				}
				else if (handX < 50){
					data.freq = 329.628
				}
				else if (handX < 75){
					data.freq = 349.228
				}
				else if (handX < 125){
					data.freq = 391.995
				}
				else if (handX < 175){
					data.freq = 440.000
				}
				else if (handX < 200) {
					data.freq = 493.883
				}
				else if (handX < 225) {
					data.freq = 493.883
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
		this.note.set({freq:data.freq});
		//this.note.set({mul:data.volume});
		this.note.play();
	}

	toggleCooldown(hand) {
		this.handOnCooldown[hand] = !this.handOnCooldown[hand];
	}
}
