if (Meteor.isServer){
// var database = new MongoInternals.RemoteCollectionDriver("mongodb://heroku_m4f279zz:kp4mb8a54u27q97huql65ausj8@ds049436.mlab.com:49436/heroku_m4f279zz");
// Registrations = new Mongo.Collection('registrations', { _driver: database });
Registrations = new Mongo.Collection('registrations');

Registrations.allow({
	update: function(userId, doc) {
	return true;
},
	insert: function (doc) {
	return true;
},
	remove: function (doc) {
	return true;
}
});

}
else {
Registrations = new Mongo.Collection('registrations');

}