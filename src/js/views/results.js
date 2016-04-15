var app = app || {};

// Results will maintain a temporary collection of 
// Search results
app.ResultsView = Backbone.View.extend({
	class: 'row',
	resultsLoader: $('.results-loader').html(),
	resultsTemplate: _.template($('.results-template').html()),
	initialize: function(settings){
		this.results = 0;
		this.parent = settings.parent;
	},
	render: function(){
		this.$el.html(this.resultsTemplate());
		return this;
	},
	update: function(searchTerm){
		var self = this;
		this.parent.$resultsContainer.empty();
		this.parent.$resultsContainer.append('Loading results for...' + searchTerm);

		$.ajax({
            url: 'https://apibeta.nutritionix.com/v2/search',
            data: {
	            q: searchTerm,
	            limit: 10,
	            offset: 10,
	            appId: 'c14fb9cf',
	            appKey: '3f6a283cc964fd8cc103300670fd3234'
            }
	        }).done( function( data ) {
	        	//TODO: Display a list of search results
	        	// User clicks on item to add
    			self.parent.$resultsContainer.empty();
    			data.results.forEach(function(resultItem){
    				var itemView = new app.ResultItemView(resultItem);
    				self.parent.$resultsContainer.append(itemView.render().el);
    			});

	        	

       //        this.collection.create({ 
			    // itemName: foodItem, 
			    // calories: calories 
			    // });
            }).fail(function(){
            	self.parent.$resultsContainer.empty();
	         	self.parent.$resultsContainer.append('Oops, something went wrong with Health Tracker. Please try again later.');
	        });

	},
});