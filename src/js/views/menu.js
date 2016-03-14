var app = app || {};

app.MenuView = Backbone.View.extend({
  el: '.ht-menu',
  menuTemplate: _.template($('.menu-template').html()),
  render: function(){
    this.$el.append(this.menuTemplate());
    $('.daily').trigger('click');
    return this;
  }
});
