var app = app || {};

app.DailyView = Backbone.View.extend({
  el: '.ht-timeline-container',
  dailyTemplate: _.template($('.daily-template').html()),
  dayLoader: $('.day-loader').html(),
  events: {
    'click .add-day': 'addDay'
  },
  initialize: function(options){
    var self = this;

    this.parent = options.parent;

    this.parent.daysCollection.fetch( { reset: true });

    this.$el.html(this.dayLoader);

    this.listenTo(this.parent.daysCollection, 'add', this.renderDay);
    
    this.listenTo(this.parent.daysCollection, 'sync', this.render);

  },

  render: function(){
    this.$el.html('');
    this.parent.daysCollection.each(function(day){
      this.renderDay(day);
    }, this);
    this.$el.append(this.dailyTemplate( { num_days: this.parent.daysCollection.length } ));
  },

  renderDay: function(day){
    var dayView = new app.DayView( { model: day, parent: this } );
    this.$el.append(dayView.render().el);
  }

});
