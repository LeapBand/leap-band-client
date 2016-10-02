class Band {
	constructor(socket) {
		this.socket = socket;
		this.members = {};
	}

	process(frame, memberId) {
		this.members[memberId].process(frame);
	}

	initialize(members) {
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

		if (memberData.id in this.members) {
			this.members[memberData.id].update(memberData.data);
		}
		else {
			this.members[memberData.id] = new Member(socket, memberData.data);
		}
	}

	removeMember(memberData) {
		delete this.members[memberData.id];
	}
}
