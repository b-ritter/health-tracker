var app = app || {};

app.MenuView = Backbone.View.extend({
  el: '.ht-menu',
  menuTemplate: _.template($('.menu-template').html()),
  initialize: function() {

  },
  render: function(){
    this.$el.append(this.menuTemplate());
    return this;
  }
});
