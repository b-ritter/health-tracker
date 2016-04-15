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
		/*
		$.ajax({
            url: 'https://apibeta.nutritionix.com/v2/search',
            data: {
	            q: itemName,
	            appId: 'c14fb9cf',
	            appKey: '3f6a283cc964fd8cc103300670fd3234'
            }
	        }).done( function( data ) {
	        	//TODO: Display a list of search results
	        	// User clicks on item to add
    			
	        	console.log(data);
       //        this.collection.create({ 
			    // itemName: foodItem, 
			    // calories: calories 
			    // });
            }).fail(function(){
	         	alert('Oops, something went wrong with Health Tracker. Please try again later.');
	        });
	        */
	},
	render: function(){
		this.$el.html(this.resultsTemplate());
		return this;
	},
	update: function(searchTerm){
		this.parent.$resultsContainer.empty();
		this.parent.$resultsContainer.append('Loading results for...' + searchTerm);
	},
});