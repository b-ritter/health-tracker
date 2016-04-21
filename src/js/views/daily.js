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
      var newDay = new app.DayView( { model: day, parent: self } );
      self.$el.append(newDay.render().el);
    });
    // console.log('foo');
    // this.$el.append(this.dailyTemplate( { num_days: this.parent.daysCollection.length } ));
    return this;
  }

});
