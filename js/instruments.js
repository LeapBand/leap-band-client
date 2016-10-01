class Instruments {
	constructor() {
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

		this.members = {};
		this.handOnCooldown = {};
	}

	change(name) {
		members[uid] = new instruments[name]();
	}

	toggleCooldown(hand) {
		handOnCooldown[hand] = !handOnCooldown[hand];
	}
}
