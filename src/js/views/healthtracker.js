var app = app || {};

app.HealthTrackerView = Backbone.View.extend({
  // The main app view
  el: $('.tracker'),
  login: new app.LoginView(),
  initialize: function(){
    if(this.login.isAuthenticated()){
      this.renderTimeline();
    } else {
      this.renderLogin();
    }

    this.listenTo(this.login, 'authenticated', this.renderTimeline);
    // Fires for each model in collection and
    // when a new model is added
    this.listenTo(this.login.collection, 'add', this.checkUserLoggedIn);
    // Fires once
    this.listenTo(this.login.collection, 'sync', this.checkUserLoggedIn);
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
    //TODO: Create timeline
    this.login.$el.remove();
    this.$el.append("Timeline");
  },
  checkUserLoggedIn: function(){
    console.log('foo');
  }
});
