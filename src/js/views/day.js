var app = app || {};

app.DayView = Backbone.View.extend({
  model: app.Day,
  dayTemplate: _.template($('.day-template').html()),
  initialize: function(attrs){
    this.$el.html(this.dayTemplate(attrs));
  },
  render: function(){
    return this;
  }
});