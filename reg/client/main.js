Session.setDefault('memberCount',1);

Template.body.onRendered(function() {
    $('select').material_select();
    selection = Session.get('team');
	if (selection) {
    	document.getElementById('reg_type').value='TEAM';
	}
	else {
	    document.getElementById('reg_type').value='INDIVIDUAL';

	}
});

Template.single.onRendered(function() {
    $('select').material_select();
    selection = Session.get('team');
	if (selection) {
    	document.getElementById('reg_type').value='TEAM';
	}
	else {
	    document.getElementById('reg_type').value='INDIVIDUAL';

	}
});

Template.body.events({
	'change #reg_type': function (event, template) {
		selection = event.currentTarget.value;
		console.log(selection);
		if (selection == 'TEAM') {
			//document.location.reload(true);
			Session.set("team",true);
		}
		else {
			//document.location.reload(true);
			Session.set("team",false);
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
        var handler = PaystackPop.setup({
            key: 'pk_test_753de05a86cdf76562f7d65f503b2f90369fcf73',
            email: 'thepixelbank@3wp.io',
            amount: 1000000,
            ref: Date(),
            callback: function(response){
              console.log('Success. transaction ref is ' + response.trxref);
              
              alert('Reg complete.Thank you');
              // Router.go('/viewOrder/'+orderId);
            },
            onClose: function(){
            	
        }
        });
        handler.openIframe();
		alert('Registered!');
	},
	'click .reset': function(event){
		//event.preventDefault();		
        if( ! confirm("Are you sure you want to do this?") ){
            e.preventDefault();
        } else {
            Session.set('memberCount',1);
        }
	},
	'click .toTeam': function(event){
		event.preventDefault();
		Session.set("team",true);
		Session.set('memberCount',1);

		//document.location.reload(true);

	},
	'click .toIndiv': function(event){
		event.preventDefault();
		Session.set("team",false);
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
		Session.set('memberCount',currCount);
		//document.location.reload(true);
	},
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