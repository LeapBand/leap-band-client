class Member {
	constructor(socket, data) {
		this.socket = socket;
		this.instruments = {
			drums: Drums,
			piano: Piano
			// guitar: Guitar,
		};

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
}
