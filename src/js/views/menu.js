var app = app || {};

app.MenuView = Backbone.View.extend({
  menuTemplate: _.template($('.menu-template').html()),
  render: function(){
    this.$el.append(this.menuTemplate());
    $('.daily').trigger('click');
    return this;
  }
});
