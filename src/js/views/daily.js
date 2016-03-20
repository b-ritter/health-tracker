var app = app || {};

app.DailyView = Backbone.View.extend({
  el: '.ht-timeline-container',
  days: [],
  events: {
    'click .add-day': 'addDay'
  },
  initialize: function(options){
    var self = this;
    this.parent = options.parent;
    this.parent.collection.once('sync', function(){
      self.parent.collection.each(function(day){
        day.attributes.parent = self;
        self.days.push(new app.DayView(day.attributes));
      });
      self.render();
    });
  },
  render: function(){
    var self = this;
    self.$el.html('');
    _.each(this.days, function(day){
      self.$el.append(day.render().el);
    });
  },
  addDay: function(){
    this.parent.collection.add({
      id: moment().format('YYYY-MM-D')
    });
  }
});
