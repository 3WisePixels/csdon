import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup

});

Meteor.methods({
	'reg': function(participant) {
		participant['createdAt'] = new Date();
		Registrations.batchInsert([participant]);
	},
});