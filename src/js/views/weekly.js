var app = app || {};

app.WeeklyView = Backbone.View.extend({
  weeklyTemplate: _.template($('.weekly-template').html()),
  initialize: function(options){
    this.parent = options.parent;
  },
  render: function(){
    return this.weeklyTemplate();
  }
});
