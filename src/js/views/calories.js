var app = app || {};

app.CaloriesView = Backbone.View.extend({
	model: app.CalorieTotal,
	calorieTemplate : _.template($('.calorie-template').html()),
	initialize: function(settings){
		this.parent = settings.parent;
	},

	render: function() {
		this.$el.html(this.calorieTemplate( this.model.attributes ));
		return this;
	},
	
	renderCalories: function( updatedCalories ) {
		this.$el.html(this.calorieTemplate( { calories: updatedCalories } ));
		return this;
	}
});