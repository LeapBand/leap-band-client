class Member {
	constructor(socket, data) {
		this.socket = socket;
		this.instruments = {
			drums: Drums
			// piano: Piano,
			// guitar: Guitar,
		};

		this.swapCooldown = false;

		this.instrumentOrder = [
			'drums',
			'piano',
			'guitar'
		];

		// this.username = '';
		// this.instrumentName = '';
		// this.instrument = null;
		this.memberData = data;
	}

	process(frame) {
		this.memberData.instrument.process(frame);
		if (frame.hands.length == 2 && !this.swapCooldown)
		{
			if (Math.abs(frame.hands[0].palmPosition[0] - frame.hands[1].palmPosition[0])< 150){
				console.log("Trigger 1");

				if (frame.hands[0].palmVelocity[0] > 800 && frame.hands[0].palmVelocity[0] > 800){
					console.log("Swiped right");
					this.toggleCooldown();
					setTimeout(() => {
						this.toggleCooldown();
					}, 250);
				}

				if (frame.hands[0].palmVelocity[0] < -800 && frame.hands[0].palmVelocity[0] < -800){
					console.log("Swiped left");
					this.toggleCooldown();
					setTimeout(() => {
						this.toggleCooldown();
					}, 250);
				}
			}
		}
	}

	play(instrumentData) {
		this.memberData.instrument.play(instrumentData);

	}

	update(memberData) {
		console.log('update()');
		console.log(memberData);
		this.memberData = memberData;
		return this.changeInstrument(memberData.instrumentName);
	}

	changeInstrument(instrumentName) {
		if (instrumentName in this.instruments && (!('instrument' in this.memberData) || instrumentName !== this.memberData.instrument.name)) {
			console.log('Created instrument: ' + instrumentName);
			this.memberData.instrument = new this.instruments[instrumentName](socket);
			this.memberData.instrument.name = instrumentName;
			return true;
		}
		return false;
	}

	getInstrumentName() {
		return this.memberData.instrument.name;
	}

	toggleCooldown() {
		this.swapCooldown = !this.swapCooldown;
	}
}


