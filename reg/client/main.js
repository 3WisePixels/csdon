Session.setDefault('memberCount',10);

Template.mainReg.onCreated(function() {
	Meteor.subscribe('registrations');
})
Template.mainReg.onRendered(function() {
    $('select').material_select();
    selection = Session.get('team');
	if (selection) {
    	document.getElementById('reg_type').value='TEAM';
		Session.set("children",0);
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

Template.mainReg.events({
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
	'change #children': function (event, template) {
		selection = event.currentTarget.value;
		console.log(selection);
		if (selection == '') {
			Session.set("children",0);
		}
		else {
			//document.location.reload(true);
			Session.set("children",selection);
		}
  	},

  	'click .latePay': function(event){
  		event.preventDefault();
		participant = {};
		res = document.getElementById('regForm').elements;
		console.log(res);
		for (i=0; i<res.length; i++) {
			console.log(res[i].value);
			participant[res[i].name] = res[i].value;
		}
		console.log(participant);
		var price = Session.get('price')*1;
		reg = Registrations.batchInsert([participant]);
		console.log(reg);


		// res.forEach(doc => {
		// 	console.log(doc);
		//   // Collection.insert(doc);
		// });

		// for (i=0; i<res.length; i++) {
		// 	console.log(res[i].value);
		// 	participant[res[i].name] = res[i].value;
		// }

  	},
	'click .securePay': function(event) {
		//event.preventDefault();
		// console.log(event.target.validity.valid);
		// console.log(event);

		participant = {};
		res = document.getElementById('regForm').elements;
		console.log(res);
		for (i=0; i<res.length; i++) {
			console.log(res[i].value);
			participant[res[i].name] = res[i].value;
		}
		console.log(participant);
		var price = Session.get('price')*100;
		if (error) {
		}
        var handler = PaystackPop.setup({
            key: 'pk_test_753de05a86cdf76562f7d65f503b2f90369fcf73',
            email: 'thepixelbank@3wp.io',
            amount: price,
            ref: Date(),
            callback: function(response){
              console.log('Success. transaction ref is ' + response.trxref);
              
              alert('Registration complete. Check your email for confirmation. Thanks for your support!');
			//    		Bookings.insert({
			// 	email: booking['email'],		
			// })
    
              // Router.go('/viewOrder/'+orderId);
            },
            onClose: function(){
            	
        }
        });
        handler.openIframe();
        //Should below go into onClose()?
	},
	'click .reset': function(event){
		//event.preventDefault();		
        if( ! confirm("Are you sure you want to do this?") ){
            e.preventDefault();
        } else {
            Session.set('memberCount',5);
        }
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

Template.mainReg.helpers({
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
  	},
  	price: function(){
  		if (Session.get('team')){
	  		mCount = Session.get('memberCount');
	  		currPrice = 4000*mCount;
  			childrenTotal = 2000*Session.get('children');
  			if (isNaN(childrenTotal)){
  				childrenTotal = 0;
  			}
  			currPrice += childrenTotal;		
  		}
  		else {
  			currPrice = 6000;
  		}
  		Session.set('price',currPrice);
  		return currPrice;

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