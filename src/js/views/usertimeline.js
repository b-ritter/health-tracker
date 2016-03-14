var app = app || {};

app.UserTimelineView = Backbone.View.extend({
  el: '.ht-user-timeline',
  menu: new app.MenuView(),
  userTemplate: _.template($('.user-template').html()),
  events: {
    'click .edit-user': 'editUser'
  },
  render: function(userAttributes){
    this.$el.find('.ht-usercontrol').append(this.userTemplate({ username: userAttributes.username }));
    this.$el.append(this.menu.render().el);
    return this;
  },
  editUser: function(){
    console.log('edit user');
  }
});
