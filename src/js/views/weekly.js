var app = app || {};

app.WeeklyView = Backbone.View.extend({
  weeklyTemplate: _.template($('.weekly-template').html()),
  render: function(){
    return this.weeklyTemplate();
  }
});
