var app = app || {};

app.UserTimelineView = Backbone.View.extend({
  el: '.ht-user-timeline',
  menu: new app.MenuView(),
  userTemplate: _.template($('.user-template').html()),
  initialize: function(){
    //
  },
  render: function(userAttributes){
    this.$el.append(this.menu.render().el);
    this.$el.append(this.userTemplate({ username: userAttributes.username }));

    return this;
  }
});
