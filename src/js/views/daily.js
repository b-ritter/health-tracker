var app = app || {};

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

    this.listenTo(this.daysCollection, 'add', function(addedDay){
      self.makeNewDayView(addedDay);
    });

    return this;
  }, 

  makeNewDayView: function(day){
    var newDay = new app.DayView( { model: day, parent: this } );
    this.$el.append(newDay.render().el);
  }

});
