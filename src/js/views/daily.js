var app = app || {};

app.DailyView = Backbone.View.extend({
  el: '.ht-timeline-container',
  days: [],
  events: {
    'click .add-day': 'addDay',
    'click .add-item': 'addItem'
  },
  initialize: function(options){
    var self = this;
    this.parent = options.parent;
    this.parent.collection.on('sync', function(){
      self.parent.collection.each(function(day){
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
  },
  addItem: function(){
    // console.log(this.parent.collection.model);
    this.parent.collection.add({
      id: moment().format('YYYY-MM-D'),
      food: ['juice']
    });
  }
});
