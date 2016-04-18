var app = app || {};

app.ResultItemView = Backbone.View.extend({
	class: 'row',
	resultItemTemplate: _.template($('.result-item-template').html()),
	events: {
		'click .add-item': 'addThisItem'
	},
	initialize: function(data, settings ){
		this.parent = settings.parent;
		this.data = data;
	},
	render: function(){
		this.$el.html(this.resultItemTemplate(this.data));
		return this;
	},
	addThisItem: function(){
		var self = this;

		this.parent.parent.collection.add({
			resourceId: self.data.resource_id,
			brandName: self.data.brand_name,
			itemName: self.data.item_name,
			calories: (function(){
				return self.data.nutrient_value ? self.data.nutrient_value :  0;
			})()
		});

	}
});