class Drums {
	constructor() {
		this.handOnCooldown = {};
		this.tom = T("audio", {load:"/data/lowTom.mp3"});
		this.hiHat = T("audio", {load:"/data/hiHitom.mp3"});
		this.kick = T("audio", {load:"/data/kick.mp3"});
		this.snare = T("audio", {load:"/data/snare.mp3"});
	}

	process(frame) {
		var _self = this;
		frame.hands.forEach(function(hand, index) {
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
