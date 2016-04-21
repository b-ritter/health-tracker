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

    this.dayViews = [];

    this.parent.daysCollection.fetch( { 
      reset: true,
      success: function(collection){
        collection.forEach(function(day){
          self.dayViews.push(new app.DayView( { model: day, parent: self } ));
        });

        self.listenTo(self.parent.daysCollection, 'add', function(day){
          self.dayViews.push(new app.DayView( { model: day, parent: self } ));
          self.render();
        });

        self.render();
      }
    });

    this.$el.html(this.dayLoader);
    
    // this.listenTo(this.parent.daysCollection, 'sync', this.render);

  },

  render: function(){
    this.$el.html('');
    this.dayViews.forEach(function(day){
      this.$el.append(day.render().el);
    }, this);
    // this.$el.append(this.dailyTemplate( { num_days: this.parent.daysCollection.length } ));
    return this;
  }

});
