var app = app || {};

/** @description The total calories for each day
*	@constructor
*/
app.CalorieTotal = Backbone.Firebase.Model.extend({
	defaults: { calories: 0 },
	initialize: function(attributes, options){
		this.url = 'https://br-health-tracker.firebaseio.com/calorietotals/' + options.uid + '/' + options.id;
	}
});