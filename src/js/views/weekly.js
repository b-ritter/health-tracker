var app = app || {};

app.WeeklyView = Backbone.View.extend({
  weeklyTemplate: _.template($('.weekly-template').html()),
  initialize: function(options){
    this.parent = options.parent;

    this.parent.daysCollection.fetch( { reset: true });

    this.listenTo(this.parent.daysCollection, 'add', this.renderDay);
    
    this.listenTo(this.parent.daysCollection, 'all', this.render);
  },
  render: function(){
    return this.weeklyTemplate({ num_days: this.parent.daysCollection.length});
  }
});
