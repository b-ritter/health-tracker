var app = app || {};

app.UserView = Backbone.View.extend({
	model: app.User,
	userTemplate: _.template($('.user-template').html()),
	events: {
		'click .edit' : 'editUser'
	},
	render: function(){
		this.$el.html(this.userTemplate(this.model.attributes));
		return this;
	},
	editUser: function(){
		console.log('edit me');
	}
});