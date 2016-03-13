var app = app || {};

app.MenuView = Backbone.View.extend({
  el: '.ht-menu',
  menuTemplate: _.template($('.menu-template').html()),
  events: {
    'click .daily': 'showDaily',
    'click .weekly': 'showWeekly',
    'click .monthly': 'showMonthly',
  },
  initialize: function() {
    console.log('foo');
    $('.daily').trigger('click');
  },
  render: function(){
    this.$el.append(this.menuTemplate());
    $('.daily').trigger('click');
    return this;
  },
  showDaily: function(){
    console.log('daily clicked');
  },
  showWeekly: function(){
    console.log('weekly clicked');
  },
  showMonthly: function(){
    console.log('monthly clicked');
  }
});
