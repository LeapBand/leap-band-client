class Band {
	constructor(socket) {
		this.socket = socket;
		this.members = {};
	}

	watchInstrument(callback) {
		this.instrumentChanged = callback;
	}

	process(frame) {
		if (this.myId) {
			this.members[this.myId].process(frame);
		}
	}

	initialize(members, myId) {
		this.myId = myId;
		for (let memberId in members) {
			let memberData = {
				id: memberId,
				data: members[memberId]
			};
			this.updateMember(memberData);
		}
	}

	play(data) {
		// Play music with any of the clients' instruments
		// Note: This data comes from the server
		this.members[data.id].play(data.data);
	}

	updateMember(memberData) {
		// console.log('updateMember()');
		// console.log(memberData);

		if (!(memberData.id in this.members)) {
			this.members[memberData.id] = new Member(socket, memberData.data);
			// console.log('Adding new member');
		}
		let changed = this.members[memberData.id].update(memberData.data);
		if (changed && memberData.id == this.myId && this.instrumentChanged) {
			this.instrumentChanged(this.members[memberData.id].getInstrumentName());
		}

		// console.log(this.members);
	}

	removeMember(memberData) {
		delete this.members[memberData.id];
	}
}
