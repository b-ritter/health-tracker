var app = app || {};

app.CalorieTotal = Backbone.Firebase.Model.extend({
	defaults: { calories: 0 },
	initialize: function(attributes, options){
		this.url = 'https://br-health-tracker.firebaseio.com/calorietotals/' + options.uid + '/' + options.id;
	}
});