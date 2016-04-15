var app = app || {};

app.ItemsView = Backbone.View.extend({
	model: app.List,
	itemsTemplate: _.template($('.item-list-template').html()),
	events: {
   	 'click .add-item': 'addItem'
	},

	initialize: function(settings){
		// TODO: Item input should be its own view
		// and be disposed of when editing is closed

		this.parent = settings.parent;

		this.collection = new app.Items(null, { uid: this.model.attributes.uid, id: this.model.id } );

		this.collection.fetch({ reset: true });

	    this.listenTo( this.collection, 'add', this.renderItem );

	    this.listenTo( this.collection, 'add', this.updateDay );

	    this.listenTo( this.collection, 'remove', this.updateDay );

	    this.listenTo( this.collection, 'reset', this.render );
	},

	renderItem: function( item ) {
	    var itemView = new app.ItemView({
	        model: item
	    });

	    this.$el.find('.item-list').append( itemView.render().el );
	},

	render: function(){
		this.$el.html(this.itemsTemplate({ num_items: this.collection.length }));
		this.$itemInput = this.$el.find('.ht-item');
	    this.collection.each(function( item ) {
	        this.renderItem( item );
	    }, this );
	    this.selectItem();
	    return this;
	},

	updateDay: function() {
	    var self = this;
	    var calcount = 0;
	    this.collection.each(function(item){
	      calcount += +item.get('calories');
	    });
	    this.parent.model.set({
	      calories: calcount
	    });
	},
	
	selectItem: function(){
	    var self = this;
	    $( ".ht-item", this.$el).autocomplete({
	        source: function( request, response ) {
	          $.ajax({
	            url: 'https://apibeta.nutritionix.com/v2/autocomplete',
	            data: {
	              q: request.term,
	              appId: 'c14fb9cf',
	              appKey: '3f6a283cc964fd8cc103300670fd3234'
	            }
	        }).done( function( data ) {

	              var res = [];

	              _.each(data, function( item ){
	                res.push( { label: item.text, value: item.id } ) ;
	              });

	              response( res );

	            }
	         ).fail(function(){
	         	alert('Oops, something went wrong with Health Tracker. Please try again later.');
	         });
        },
        minLength: 3,
        select: function( event, ui ) {
          event.preventDefault();
          self.$itemInput.attr( 'data-nxid', ui.item.value );
          self.$itemInput.val( ui.item.label );
          self.showItems( ui.item.label, ui.item.value );
        },
        focus: function( event, ui ) {
          event.preventDefault();
          self.$itemInput.attr( 'data-nxid', ui.item.value );
          self.$itemInput.val( ui.item.label );
        },
        open: function() {
          $( this ).removeClass( 'ui-corner-all' ).addClass( 'ui-corner-top' );
        },
        close: function() {
          $( this ).removeClass( 'ui-corner-top' ).addClass( 'ui-corner-all' );
        }
      });
	},

	showItems: function(itemName, itemId){
	 	var self = this;
	    if( itemId === undefined ){
	    	alert("Sorry, we couldn't find any nutritional information on " + itemName + ". Please try again." );
	    } else {
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
    			self.resultsList = new app.ResultsView();
	        	console.log(data);
       //        this.collection.create({ 
			    // itemName: foodItem, 
			    // calories: calories 
			    // });
            }).fail(function(){
	         	alert('Oops, something went wrong with Health Tracker. Please try again later.');
	        });
	    }
	    
  },

  addItem: function(){
	// this.$itemInput.attr('data-nxid')
	// this.$itemInput.val('');
  }

});