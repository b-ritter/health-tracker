var app = app || {};

app.MonthlyView = Backbone.View.extend({
  monthlyTemplate: _.template($('.monthly-template').html()),
  initialize: function(options){
    this.parent = options.parent;
  },
  render: function(){
    return this.monthlyTemplate();
  }
});
