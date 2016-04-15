var app = app || {};

// Sample query string to get individual result
// https://apibeta.nutritionix.com/v2/item/VRO6INEAn?&appId=c14fb9cf&appKey=3f6a283cc964fd8cc103300670fd3234

app.ResultItemView = Backbone.View.extend({
	class: 'row',
	resultItemTemplate: _.template($('.result-item-template').html()),
	initialize: function(){

	},
	render: function(){

	}
});