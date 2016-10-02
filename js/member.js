class Member {
	constructor(socket, data) {
		this.socket = socket;
		this.instruments = {
			drums: Drums,
			piano: Piano
			// guitar: Guitar,
			// techno: Techno
		};

		this.swapCooldown = false;

		this.instrumentNames = [
			'drums',
			'piano'
			// 'guitar',
			// 'techno'
		];
		this.instrumentId = 0;

		// this.username = '';
		this.memberData = data;
	}

	process(frame) {
		this.memberData.instrument.process(frame);
		if (frame.hands.length == 2 && !this.swapCooldown)
		{
			if (Math.abs(frame.hands[0].palmPosition[0] - frame.hands[1].palmPosition[0])< 150){
				if (frame.hands[0].palmVelocity[0] > 800 && frame.hands[0].palmVelocity[0] > 800){
					console.log("Swiped right");
					this.toggleCooldown();
					setTimeout(() => {
						this.toggleCooldown();
					}, 250);
					this.changeInstrumentFromDelta(1);
				}

				if (frame.hands[0].palmVelocity[0] < -800 && frame.hands[0].palmVelocity[0] < -800){
					console.log("Swiped left");
					this.toggleCooldown();
					setTimeout(() => {
						this.toggleCooldown();
					}, 250);
					this.changeInstrumentFromDelta(-1);
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
			this.memberData.instrumentName = instrumentName;
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

	// Delta can be something like -1 or 1
	changeInstrumentFromDelta(delta) {
		this.instrumentId += delta;
		if (this.instrumentId < 0) {
			this.instrumentId += this.instrumentNames.length;
		}
		this.instrumentId %= this.instrumentNames.length;

		let newName = this.instrumentNames[this.instrumentId];

		console.log('instrumentId: ' + this.instrumentId);
		console.log('instrumentName: ' + newName);

		// Update actual instrument name on the server
		this.socket.emit('update_member', {
			username: 'testuser',
			instrumentName: newName
		});
	}
}


