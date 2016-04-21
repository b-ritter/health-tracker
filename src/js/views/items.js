var app = app || {};

app.ItemsView = Backbone.View.extend({
	model: app.List,
	itemsTemplate: _.template($('.item-list-template').html()),

	initialize: function(settings){

		this.parent = settings.parent;

		this.resultsList = new app.ResultsView({ parent: this });

		this.collection = new app.Items(null, { uid: this.model.attributes.uid, id: this.model.id } );

	    this.listenTo( this.collection, 'add', this.renderItem );

	    this.listenTo( this.collection, 'add', this.render );

	    this.listenTo( this.collection, 'remove', this.render );

	    this.listenTo( this.collection, 'sync', this.render );

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
		this.$resultsContainer = this.$el.find('.results-container');
		this.$resultsContainer.append(this.resultsList.render().el);
	    this.collection.each(function( item ) {
	        this.renderItem( item );
	    }, this );
	    this.selectItem();
	    return this;
	},

	updateDay: function() {

	    var self = this;

	    if(this.$resultsContainer){
	    	this.$resultsContainer.empty();
	    }

	    if(this.$itemInput){
	    	this.$itemInput.val('');
	    }
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
        minLength: 2,
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
	    	self.resultsList.update(itemName);
	    }
  },
  countCalories: function(){
    var calcount = 0;

    this.collection.each(function(item){
      calcount += +item.get('calories');
    });

    return calcount;
  }

});