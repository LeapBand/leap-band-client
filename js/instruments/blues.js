class Blues{
	constructor(socket) {
		this.bluesScale = [
			"E3",
			"G3",
			"Bb3",
			"B3",
			"D4",
			"E4",
			"G4",
			"Bb4",
			"B4",
			"D5",
			"E5",
			"G5",
			"Bb5",
			"B5"
		];
		this.socket = socket;
		this.audio = {
			lead: this.makeWadObject(2.0),
			root: this.makeWadObject(),
			third: this.makeWadObject(),
			fifth: this.makeWadObject()
		};
		this.first1 = true;
		this.first2 = true;
		this.lastTime = Date.now();

		// console.log("Blues created");
	}

	makeWadObject(volume) {
		return new Wad({
			source: 'sine',
			env     : {      // This is the ADSR envelope.
				attack  : 0.1,  // Time in seconds from onset to peak volume.  Common values for oscillators may range from 0.05 to 0.3.
				decay   : 0.1,  // Time in seconds from peak volume to sustain volume.
				sustain : 0.3,  // Sustain volume level. This is a percent of the peak volume, so sensible values are between 0 and 1.
				hold    : 0.1, // Time in seconds to maintain the sustain volume level. If this is not set to a lower value, oscillators must be manually stopped by calling their stop() method.
				release : 0.1     // Time in seconds from the end of the hold period to zero volume, or from calling stop() to zero volume.
			},
			volume: volume || 1.0
		});
	}

	process(frame) {
		let currentTime = Date.now();
		let delay = 300;
		frame.hands.forEach((hand, index) => {
			var data = {};
			if(currentTime >= this.lastTime + delay){

				// Only reset last time when on the last hand
				if (index === frame.hands.length - 1) {
					this.lastTime = currentTime;
				}

				if(hand.type === "left"){
					var lhX = hand.palmPosition[0],
						lhY = hand.palmPosition[1],
						lhZ = hand.palmPosition[2];
					// I
					if(lhX < -133){
						data.root = "E3";
						data.third = "G3";
						data.fifth = "B3";
					}
					// IV
					else if(lhX < -66){
						data.root = "A3";
						data.third = "C#4";
						data.fifth = "E4";
					}
					// V
					else if(lhX < 0){
						data.root = "B3";
						data.third = "D#4";
						data.fifth = "F#4";
					}

					if(lhX < 0 ){
						this.socket.emit('play', data);
					}
				}
				else{
					var handX = hand.palmPosition[0],
						handY = hand.palmPosition[1],
						handZ = hand.palmPosition[2];

					let bucket = Math.floor(scale(80, 400, 0, this.bluesScale.length - 1, handY));
					data.leadNote = this.bluesScale[bucket];
					this.socket.emit('play', data);
				}
			}
		});
	}

	play(data) {
		// is lead instrument
		if(data.hasOwnProperty("leadNote")){
			if (!this.first1) {
				this.audio.lead.stop();
				this.first1 = false;
			}
			// leadNote
			this.audio.lead.play({pitch: data.leadNote});
		}
		// is chord
		else{
			if (!this.first2) {
				this.audio.lead.stop();
				this.first2 = false;
			}
			this.audio.root.play({pitch: data.root});
			this.audio.third.play({pitch: data.third});
			this.audio.fifth.play({pitch: data.fifth});
		}

		var drawConfig = {
			color: "#0000CD",
			fill: false,
			concentric: true
		};
		drawCircle(drawConfig);
	}
}