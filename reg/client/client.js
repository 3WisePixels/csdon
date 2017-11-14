Template.registerHelper('arrayify',function(obj){
    var result = [];
    for (var key in obj) result.push({name:key,value:obj[key]});
    return result;
});

Template.registerHelper('extract',function(obj){
    var regis= [];
    var result = {}
	for (var index in obj) {
		// console.log(obj[index]);
		for (var detail in obj[index]) {
			// result.push({
			// 	header: detail,
			// 	value: obj[index][detail]
			// });
			result[detail] = obj[index][detail]
		}
		regis[index] = result;
		result = {};
	}
	// console.log(result);
    return regis;
});

Template.registerHelper('log',function(obj){
	console.log(obj);
    return obj;
});

// Template.registerHelper('date',function(obj){
// 	rid = this._id;
// 	const generatedId = new Mongo.ObjectID()._str
// 	console.log(typeof rid);
// 	var id = new Meteor.Collection.ObjectID(this._id).getTimestamp();

//     return objId;
// });