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
    this.collection = new app.Items(null, { uid: this.parent.parent.currentUserId, id: this.id });
    this.$el.html(this.dayTemplate(attrs));
    this.$itemInput = this.$el.find('.form-control');
    this.$itemDisplay = this.$el.find('.item-list');
    this.collection.once( 'sync', function(){
      self.collection.each(function(item){
        self.$itemDisplay.prepend(new app.ItemView(item.attributes).render().el);
      });
      self.listenTo(self.collection, 'add', function(item){
        self.$itemDisplay.prepend(new app.ItemView(item.attributes).render().el);
      });
    });
  },
  render: function(){
    return this;
  },
  addItem: function(){
    var self = this;
    // alert('foo');
    var foodItem = this.$itemInput.val();
    this.collection.add({ 
      itemName: foodItem, 
      calories: 0 
    });
    this.$itemInput.val('');
  }
});