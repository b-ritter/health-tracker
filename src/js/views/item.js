var app = app || {};

app.ItemView = Backbone.View.extend({
	itemTemplate: _.template($('.item-template').html()),
	initialize: function(attrs){
		this.$el.html(this.itemTemplate(attrs));
	},
	render: function(){
		return this;
	}
});