Session.setDefault('memberCount',10);

Template.mainLayout.onRendered(function(){
    setTimeout(function(){
        $('#xLoader').addClass('xGo');
    },2666)
});
Template.mainReg.onCreated(function() {
	Meteor.subscribe('registrations');
})
Template.admin.onCreated(function() {
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
    $('#gamesOpt').change(function(){
        if ($(this).is(":checked")){
            Session.set('games',true);
        }else{
            Session.set('games',false);
        }
    })

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
		Meteor.call('reg',participant);
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
		event.preventDefault();
		// console.log(event.target.validity.valid);
		// console.log(event);

		participant = {};
		regForm = document.getElementById('regForm');


		res = regForm.elements;
		console.log(res);
		for (i=0; i<res.length; i++) {
			currVal = res[i];
			if (currVal.checkValidity() == false) {
        		alert('Please fill out '+res[i].name);
        		return false;
		    } else {
		    	console.log('Form success');
				participant[res[i].name] = res[i].value;
			}
		}
		console.log(participant);
		var price = Session.get('price')*100;
        var handler = PaystackPop.setup({
            key: 'pk_live_bc32ba513cc77d0456fd1e3befd133af0306a136',
            email: 'contact@csdon.org',
			// key: 'pk_test_753de05a86cdf76562f7d65f503b2f90369fcf73',
			// email: 'thepixelbank@3wp.io',
            amount: price,
            ref: Date.now(),
            callback: function(response){
          	console.log('Success. transaction ref is ' + response.trxref);
          	alert('Registration complete. We will contact you shortly. Thanks for your support!');
			Meteor.call('reg',participant);
            document.getElementById('regForm').reset();
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
            Session.set('memberCount',10);
        }
	},
	'click .toIndiv': function(event){
		event.preventDefault();
		Session.set("team",false);
		//document.location.reload(true);

	},
	'click .addMember': function(event) {
		event.preventDefault();
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
	  		currPrice = 4500*mCount;
  			childrenTotal = 2000*Session.get('children');
  			if (isNaN(childrenTotal)){
  				childrenTotal = 0;
  			}
  			currPrice += childrenTotal;
  		}
  		else {
  			currPrice = 6000;
  			childrenTotal = 2000*Session.get('children');
  			if (isNaN(childrenTotal)){
  				childrenTotal = 0;
  			}
  			currPrice += childrenTotal;
  		}
  		Session.set('price',currPrice);
        if (Session.get('games')){
            currPrice = 500+Session.get('price');
            Session.set('price',currPrice);
        }
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
