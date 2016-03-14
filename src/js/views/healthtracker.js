var app = app || {};

app.HealthTrackerView = Backbone.View.extend({
  // The main app view
  el: $('.ht-app'),
  login: new app.LoginView(),
  loader: $($('.loader-template').html()),
  initialize: function(){
    this.userTimeline = new app.UserTimelineView({ parent: this });
    this.listenTo(this.login, 'authenticated', this.renderUser);
    if(!this.login.isAuthenticated()){
      this.renderLogin();
    } else {
      this.$el.append(this.loader);
    }
  },
  renderLogin: function(){
    this.login.$el.append(this.login.render().el);
  },
  renderUser: function(){
    this.loader.remove();
    this.login.$el.remove();
    this.userTimeline.$el.append(this.userTimeline.render(this.login.currentUser.attributes.toJSON()).el);
  }
});
