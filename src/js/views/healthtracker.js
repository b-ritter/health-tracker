var app = app || {};

app.HealthTrackerView = Backbone.View.extend({
  // The main app view
  el: $('.tracker'),
  login: new app.LoginView(),
  loader: $($('.loader').html()),
  userTimeline: new app.UserTimelineView(),
  initialize: function(){
    this.$el.append(this.loader);
    this.listenTo(this.login, 'authenticated', this.renderUser);
    if(!this.login.isAuthenticated()){
      this.renderLogin();
    }
  },
  render: function(){

  },
  renderLogin: function(){
    this.$el.append(this.login.render().el);
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
    // console.log(this.login.currentUser.attributes.toJSON());
    // this.userTimeline.userTemplate(this.login.currentUser.attributes.toJSON());
    // console.log(this.userTimeline.userTemplate({username: 'foo'}));
    this.$el.append(this.userTimeline.render(this.login.currentUser.attributes.toJSON()).el);
  }
});
