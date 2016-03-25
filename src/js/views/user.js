var app = app || {};

app.UserView = Backbone.View.extend({
	el: '.ht-user',
	// model: app.User,
	userTemplate: _.template($('.user-template').html()),
	events: {
		'click .edit' : 'editUser'
	},

	render: function(){
		this.$el.prepend(this.userTemplate(this.model));
		return this;
	},

	editUser: function(){
		console.log('edit me');
	}
});