var app = app || {};

app.UserTimelineView = Backbone.View.extend({
  el: '.ht-user-timeline',
  menu: new app.MenuView(),
  day: new app.DayView(),
  userTemplate: _.template($('.user-template').html()),
  events: {
    'click .edit-user': 'editUser'
  },
  render: function(userAttributes){
    this.$el.find('.ht-usercontrol').append(this.userTemplate({ username: userAttributes.username }));
    this.$el.find('.ht-menu').append(this.menu.render().el);
    this.$el.find('.ht-timeline-container').append(this.day.render());
    return this;
  },
  editUser: function(){
    console.log('edit user');
  }
});
