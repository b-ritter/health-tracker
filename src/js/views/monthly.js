var app = app || {};

app.MonthlyView = Backbone.View.extend({
  monthlyTemplate: _.template($('.monthly-template').html()),
  render: function(){
    return this.monthlyTemplate();
  }
});
