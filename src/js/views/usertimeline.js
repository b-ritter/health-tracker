var app = app || {};

app.UserTimelineView = Backbone.View.extend({
  el: '.user-timeline',
  userTemplate: _.template($('.user-template').html()),
  initialize: function(){

  },
  render: function(userAttributes){
    this.$el.html(this.userTemplate({ username: userAttributes.username }));
    return this;
  }
});
