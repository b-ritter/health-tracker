var app = app || {};

app.DayView = Backbone.View.extend({
  el: '.ht-timeline-container',
  defaults: {
    item: null,
    day: moment().format('dddd, MMMM Do YYYY')
  },
  model: null,
  dayTemplate: _.template($('.day-template').html()),
  events: {
    'click .add-day': 'addDay',
    'click .add-item': 'addItem'
  },
  initialize: function(options){
    this.parent = options.parent;
  },
  render: function(){
    return this.dayTemplate( this.model || this.defaults );
  },
  addDay: function(){
    console.log('add a day');
  },
  addItem: function(){
    console.log('add item');
  }
});
