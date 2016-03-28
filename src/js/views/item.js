var app = app || {};

app.ItemView = Backbone.View.extend({
	model: app.Item,
	itemTemplate: _.template($('.item-template').html()),
	events: {
		'click .delete' : 'delete'
	},
	render: function(){
		this.$el.html(this.itemTemplate(this.model.attributes));
		return this;
	},
	delete: function(){
		var self = this;
        this.model.destroy({
          success: function(){
            self.remove();
          }
        });
	}
});