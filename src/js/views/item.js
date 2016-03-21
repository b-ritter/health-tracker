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
		console.log(this);
		var self = this;
        this.model.destroy({
          success: function(){
            console.log('destroyed');
            //Delete view
            self.remove();
          }
        });
	}
});