var app = app || {};

app.DailyView = Backbone.View.extend({
  class: '.ht-timeline-container',
  dailyTemplate: _.template($('.daily-template').html()),
  dayLoader: $('.day-loader').html(),
  events: {
    'click .add-day': 'addDay'
  },
  initialize: function(options){
    var self = this;

    this.parent = options.parent;

    this.parent.daysCollection.fetch( { reset: true });

  },

  render: function(){
    var self = this;
    this.parent.daysCollection.each(function(day){
      self.makeNewDayView(day);
    });

    this.listenTo(this.parent.daysCollection, 'add', function(addedDay){
      self.makeNewDayView(addedDay);
    });

    return this;
  }, 

  makeNewDayView: function(day){
    var newDay = new app.DayView( { model: day, parent: this } );
    this.$el.append(newDay.render().el);
  }

});
