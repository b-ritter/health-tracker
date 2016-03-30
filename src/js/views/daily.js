var app = app || {};

app.DailyView = Backbone.View.extend({
  el: '.ht-timeline-container',
  events: {
    'click .add-day': 'addDay'
  },
  initialize: function(options){
    var self = this;

    this.parent = options.parent;

    this.parent.daysCollection.fetch( { reset: true });

    this.listenTo(this.parent.daysCollection, 'add', this.renderDay);
    
    this.listenTo(this.parent.daysCollection, 'all', this.render);

  },

  render: function(){
    this.$el.html('');
    this.parent.daysCollection.each(function(day){
      this.renderDay(day);
    }, this);
  },

  renderDay: function(day){
    var dayView = new app.DayView( { model: day, parent: this } );
    this.$el.append(dayView.render().el);
  }

});
