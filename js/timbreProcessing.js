/**
 * Created by cferrier on 10/1/2016.
 */

// update member
var updateMember = function(member){
	// new member
	members[member.id] = member.data;
};

// remove member
var memberLeft = function(member){
	if(members.hasOwnProperty(member.id)){
		delete members[member.id];
	}
};

// set instrument
// set frequency
// set volume

//play test