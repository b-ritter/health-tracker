var app = app || {};

app.DayView = Backbone.View.extend({
  day: {day: 'April 1, 2016'},
  dayTemplate: _.template($('.day-template').html()),
  initialize: function(){
    // Get latest day
  },
  render: function(){
    return this.dayTemplate( this.day );
  }
});
