var app = app || {};

app.DayView = Backbone.View.extend({
  model: app.Day,
  dayTemplate: _.template($('.day-template').html()),
  events: {
    'click .edit-day': 'editDay',
    'click .add-item': 'addItem',
    'click .remove-day': 'removeDay'
  },
  initialize: function(attrs){
    var self = this;
    
    this.parent = attrs.parent;
    

    this.collection = new app.Items(null, { uid: this.parent.parent.currentUserId, id: this.model.id });
    
    this.$el.html(this.dayTemplate(this.model.attributes));

    this.$dayData = this.$el.find('.day-controls');

    this.$itemInput = this.$el.find('.ht-item');

    this.$itemDisplay = this.$el.find('.item-list');

    this.collection.fetch({ reset: true });

    this.listenTo( this.collection, 'add', this.renderItem );

    this.listenTo( this.collection, 'reset', this.render );

    this.listenTo( this.model, 'destroy', this.removeItems );

  },
  renderItem: function( item ) {
    var itemView = new app.ItemView({
        model: item
    });
    this.$itemDisplay.prepend( itemView.render().el );
  },

  render: function() {
    this.collection.each(function( item ) {
        this.renderItem( item );
    }, this );
    this.selectItem();
    return this;
  },

  selectItem: function(){
    var self = this;
    $( ".ht-item", this.$el).autocomplete({
        source: function( request, response ) {
          $.ajax({
            url: 'https://api.nutritionix.com/v2/search',
            data: {
              q: request.term,
              appId: 'c14fb9cf',
              appKey: '3f6a283cc964fd8cc103300670fd3234',
              exact: true
            },
            success: function( data ) {
       
              var res = [];

              _.each(data.results, function( item ){
                // console.log(item);
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
  },

  editDay: function(e){
    // console.log(e.currentTarget.checked);
    if(e.currentTarget.checked){
      this.$dayData.addClass('show-for-small');
      this.$dayData.removeClass('hide');
    } else {
      this.$dayData.removeClass('show-for-small');
      this.$dayData.addClass('hide');
    }
  },

  removeItems: function(){
    // When the day is removed, clear out all items in the 
    // database associated with that day
    this.collection.each(function(item){
      item.destroy();
    });
  },

  removeDay: function(){
    // Removes the day from the database
    var self = this;
        this.model.destroy({
          success: function(){
            self.remove();
          }
        });
  }
});