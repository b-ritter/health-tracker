var app = app || {};

app.WeekView = Backbone.View.extend({
	model: app.Week,
	weekTemplate: _.template($('.week-template').html()),
	render: function(){
		return this.$el.html(this.weekTemplate());
	}
});