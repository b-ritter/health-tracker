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
		this.$el.html(this.itemsTemplate());
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
            url: 'https://api.nutritionix.com/v2/search',
            data: {
              q: request.term,
              limit: 5,
              offset: 1,
              appId: 'c14fb9cf',
              appKey: '3f6a283cc964fd8cc103300670fd3234'
            },
            success: function( data ) {
              var res = [];

              _.each(data.results, function( item ){
                
                res.push( { label: item.item_name, value: item.nutrient_value } ) ;
              });

              response( res );
            }
          });
        },
        minLength: 3,
        select: function( event, ui ) {
          event.preventDefault();
          self.$itemInput.attr( 'data-nxid', ui.item.value );
          self.$itemInput.val( ui.item.label );
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

	addItem: function(){
	 	var foodItem = this.$itemInput.val();
	    var calories = this.$itemInput.attr('data-nxid');
	    this.collection.create({ 
	      itemName: foodItem, 
	      calories: calories 
	    });
	    this.$itemInput.val('');
  }

});