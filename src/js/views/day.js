var app = app || {};

app.DayView = Backbone.View.extend({
  model: app.Day,
  dayTemplate: _.template($('.day-template').html()),
  events: {
    'click .add-item': 'addItem'
  },
  initialize: function(attrs){
    var self = this;
    
    this.parent = attrs.parent;
    

    this.collection = new app.Items(null, { uid: this.parent.parent.currentUserId, id: this.model.id });
    
    this.$el.html(this.dayTemplate(this.model.attributes));

    this.$itemInput = this.$el.find('.form-control');

    this.$itemDisplay = this.$el.find('.item-list');

    this.collection.fetch({ reset: true });

    this.listenTo( this.collection, 'add', this.renderItem );

    this.listenTo( this.collection, 'reset', this.render );

  },
  renderItem: function( item ) {
    var itemView = new app.ItemView({
        model: item
    });
    this.$itemDisplay.prepend( itemView.render().el );
  },
  render: function() {
    this.collection.each(function( item ) {
      console.log(item);
        this.renderItem( item );
    }, this );
    return this;
  },
  addItem: function(){
    var self = this;
    var foodItem = this.$itemInput.val();
    this.collection.create({ 
      itemName: foodItem, 
      calories: 0 
    });
    this.$itemInput.val('');
  }
});