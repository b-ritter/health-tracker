var app = app || {};

app.DayView = Backbone.View.extend({
  model: app.Day,
  dayTemplate: _.template($('.day-template').html()),
  items: [],
  events: {
    'click .add-item': 'addItem'
  },
  initialize: function(attrs){
    this.parent = attrs.parent;
    this.$el.html(this.dayTemplate(attrs));
  },
  render: function(){
    return this;
  },
  addItem: function(){
    var self = this;
    // alert('foo');
    console.log(this.id);
    this.parent.parent.collection.add({
      id: this.id,
      items: ['fuice']
    });
  }
});