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
    
    this.listenTo(this.parent.collection, 'reset', this.render);
    // this.parent.collection.once('sync', function(){
    //   self.parent.collection.each(function(day){
    //     day.attributes.parent = self;
    //     self.days.push(new app.DayView(day.attributes));
    //   });
    //   self.render();
    // });
  },

  render: function(){
    this.parent.collection.each(function(day){
      this.renderDay(day);
    }, this);
  },

  renderDay: function(day){
    var dayView = new app.DayView( { model: day, parent: this } );
    // var self = this;
    // self.$el.html('');
    // _.each(this.days, function(day){
    //   self.$el.append(day.render().el);
    // });
    this.$el.append(dayView.render().el);
  },

  addDay: function(){
    this.parent.collection.add({
      id: moment().format('YYYY-MM-D')
    });
  }
});
