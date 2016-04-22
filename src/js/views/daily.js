var app = app || {};

/**
* @description A list of all the days in the user's profile
* @constructor
*/

app.DailyView = Backbone.View.extend({
  class: '.ht-daily-timeline',
  dailyTemplate: _.template($('.daily-template').html()),
  dayLoader: $('.day-loader').html(),
  events: {
    'click .add-day': 'addDay'
  },
  initialize: function(options){
    var self = this;

    this.parent = options.parent;

    this.daysCollection = new app.Days( null, { uid: this.parent.currentUserId });

  },

  render: function(){
    var self = this;
    
    this.daysCollection.each(function(day){
      self.makeNewDayView(day);
    });

    // When a day is added, append the day view to the DOM
    this.listenTo(this.daysCollection, 'add', function(addedDay){
      self.makeNewDayView(addedDay);
    });

    return this;
  }, 

  makeNewDayView: function(day){
    var newDay = new app.DayView( { model: day, parent: this } );
    // TODO: Insert the day in the proper place
    this.$el.append(newDay.render().el);
  }

});
