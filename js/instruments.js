class Instruments {
	constructor(socket) {
		this.socket = socket;

		this.instruments = {
			drums: Drums,
			piano: Piano,
			guitar: Guitar,
		};

		this.instrumentOrder = [
			'drums',
			'piano',
			'guitar'
		];

		this.currentInstrumentId = 0;

		/*
		{
			'123': new Drums(),
			'3453': new Piano()
		}
		*/
		this.members = {};

		// Current socket ID - used to uniquely identify this client
		this.currentId = null;
	}

	process(frame) {
		// Process leap data with CURRENT client's instrument
		this.members[this.currentId].process(frame);
	}

	play(data) {
		// Play music with any of the clients' instruments
		// Note: This data comes from the server
		this.members[data.id].play(data);
	}

	change(name) {
		let processor = new this.instruments[name]();
		processor.socket = this.socket;
		this.members[uid] = processor;
	}
}
