var app = app || {};

/** @description Displays the calories for each day
*	@constructor
*/
app.CaloriesView = Backbone.View.extend({
	model: app.CalorieTotal,
	calorieTemplate : _.template($('.calorie-template').html()),
	initialize: function(settings){
		this.parent = settings.parent;

		this.model.fetch();
	},

	render: function() {
		this.$el.html(this.calorieTemplate( this.model.attributes ));
		return this;
	}
});