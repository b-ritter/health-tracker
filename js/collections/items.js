var app = app || {};

/** @description A list of items for each day
*	@constructor
*/
app.Items = Backbone.Firebase.Collection.extend({
	model: app.Item,
	initialize: function(attributes, options){
		this.url = 'https://br-health-tracker.firebaseio.com/lists/' + options.uid + '/' + options.id;
	}
});
