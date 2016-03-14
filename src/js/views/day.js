var app = app || {};

app.DayView = Backbone.View.extend({
  el: '.ht-timeline-container',
  day: {day: 'April 1, 2016'},
  dayTemplate: _.template($('.day-template').html()),
  events: {
    'click .add-day': 'addDay'
  },
  initialize: function(){
    // Get latest day
  },
  render: function(){
    return this.dayTemplate( this.day );
  },
  addDay: function(){
    console.log('add a day');
  }
});
