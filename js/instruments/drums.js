class Drums {
	process(leapFrame) {
		if (leapFrame.hand.palmVelocity[1] < -400 && !handOnCooldown[leapFrame.hand.id]) {
			var handX = leapFrame.hand.palmPosition[0],
				handZ = leapFrame.hand.palmPosition[2];
			var data = {
				instrument: "drums",
				volume: leapFrame.hand.palmVelocity[1]
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

			toggleCooldown(leapFrame.hand.id);
			setTimeout(function(){
				toggleCooldown(leapFrame.hand.id)
			}, 250);
		}
	}

	play(data) {

	}
}
