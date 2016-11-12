if (Meteor.isServer){
var database = new MongoInternals.RemoteCollectionDriver("mongodb://heroku_d92nn9h1:fqlstio2199gv590h5bhk0rpeu@ds139327.mlab.com:39327/heroku_d92nn9h1");
Registrations = new Mongo.Collection('registrations', { _driver: database });

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

Meteor.publish('registrations', function() {
  return Registrations.find({},{});
});
}
else {
Registrations = new Mongo.Collection('registrations');

}