Session.setDefault('memberCount',1);

Template.body.onRendered(function() {
    $('select').material_select();
})

Template.body.events({
	'change #reg_type': function (event, template) {
		selection = event.currentTarget.value;
		console.log(selection);
		if (selection == 'TEAM') {
			//document.location.reload(true);
			Session.setPersistent("team",true);
		}
		else {
			//document.location.reload(true);
			Session.setPersistent("team",false);
		}
  	},
	'click .payBtn': function(event) {
		event.preventDefault();
		participant = {};
		res = document.getElementById('regForm').elements;
		console.log(res);
		for (i=0; i<res.length; i++) {
			console.log(res[i].value);
			participant[res[i].name] = res[i].value;
		}
		console.log(participant);
		alert('Registered!');
	},
	'click .reset': function(event){
		event.preventDefault();
		Session.setPersistent('memberCount',1);
		//document.location.reload(true);

	},
	'click .toTeam': function(event){
		event.preventDefault();
		Session.setPersistent("team",true);
		Session.setPersistent('memberCount',1);

		//document.location.reload(true);

	},
	'click .toIndiv': function(event){
		event.preventDefault();
		Session.setPersistent("team",false);
		//document.location.reload(true);

	},
	'click .addMember': function(event) {
		event.preventDefault();
		if (Session.get('memberCount')==10){
			alert('Max number of members added');
			return false;
		}
		currCount = Session.get('memberCount');
		currCount += 1;
		Session.setPersistent('memberCount',currCount);
		//document.location.reload(true);
	},
	// 'click .removeMember': function(event){
	// 	event.preventDefault();
	// 	ind = event.currentTarget.id[0];
	// 	var elem = document.getElementById("container"+ind);
	// 	console.log(elem);
	// 	elem.parentNode.removeChild(elem);
	// 	currCount = Session.get('memberCount');
	// 	currCount -= 1;
	// 	Session.setPersistent('memberCount',currCount);
	// }
})

Template.body.helpers({
	team: function(){
		return Session.get('team');
	},
	memberCount: function() {
		return Session.get('memberCount');
	},
	loopCount: function(count){
	    var countArr = [];
	    for (var i=0; i<count; i++){
	      countArr.push({});
	    }
	    return countArr;
	  }
})

Template.member.helpers({
	team: function(){
		return Session.get('team');
	},
	memberCount: function() {
		return Session.get('memberCount');
	}
})

Template.member.onRendered(function(){
    $('select').material_select();
})