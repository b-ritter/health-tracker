var app = app || {};

// 
app.Item = Backbone.Model.extend({
	itemName: '',
	brandName: '',
	calories: 0,
	resource_id: '',
	serving_qty: 0,
	serving_uom: '',
	thumbnail: ''
});
