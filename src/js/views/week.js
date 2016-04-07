var app = app || {};

app.WeekView = Backbone.View.extend({
	model: app.Week,
	className: 'row',
	weekTemplate: _.template($('.week-template').html()),
	render: function(){
		this.$el.html(this.weekTemplate());
		return this;
	}
});