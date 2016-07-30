var app = app || {};

app.ItemListUI = Backbone.View.extend({
	listUItemplate: _.template($('.item-list-ui-template').html()),
	initialize: function(settings){
		this.is_editing = false;
		this.parent = settings.parent;
	},
	render: function(){
		this.$el.html(this.listUItemplate({ is_editing: this.is_editing }));
		return this;
	},
	toggle: function(){
		this.is_editing = !this.is_editing;
	}
});