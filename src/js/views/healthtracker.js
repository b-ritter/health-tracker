var app = app || {};

app.HealthTrackerView = Backbone.View.extend({
  // The main app view
  el: $('.tracker'),
  login: new app.LoginView(),
  loader: $($('.loader').html()),
  userTimeline: new app.UserTimelineView(),
  initialize: function(){

    this.listenTo(this.login, 'authenticated', this.renderUser);
    if(!this.login.isAuthenticated()){
      this.renderLogin();
    } else {
      this.$el.append(this.loader);
    }
  },
  render: function(){

  },
  renderLogin: function(){
    // this.loader.remove();
    this.login.$el.append(this.login.render().el);
  },
  renderSearch: function(){
    //TODO: Create nutrition search
  },
  renderTimeline: function(){
    this.$el.append("Timeline");
  },
  renderUser: function(){
    this.loader.remove();
    this.login.$el.remove();
    this.userTimeline.$el.append(this.userTimeline.render(this.login.currentUser.attributes.toJSON()).el);
  }
});
