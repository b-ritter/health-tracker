var app = app || {};

app.DailyView = Backbone.View.extend({
  el: '.ht-timeline-container',
  events: {
    'click .add-day': 'addDay'
  },
  initialize: function(options){
    var self = this;

    this.parent = options.parent;

    this.parent.collection.fetch( { reset: true });

    this.listenTo(this.parent.collection, 'add', this.renderDay);
    
    this.listenTo(this.parent.collection, 'all', this.render);

  },

  render: function(){
    this.$el.html('');
    this.parent.collection.each(function(day){
      this.renderDay(day);
    }, this);
  },

  renderDay: function(day){
    var dayView = new app.DayView( { model: day, parent: this } );
    this.$el.append(dayView.render().el);
  }

});
