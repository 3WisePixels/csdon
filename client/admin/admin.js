Template.admin.helpers({
   myCollection: function () {
       return Registrations.find().fetch();
   },
   registrations: function() {
  		return Registrations.find({},{});
   }
});