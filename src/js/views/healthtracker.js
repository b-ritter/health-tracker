var app = app || {};

app.HealthTrackerView = Backbone.View.extend({
  // The main app view
  el: $('.tracker'),
  initialize: function(){
    this.renderLogin();
  },
  render: function(){

  },
  renderLogin: function(){
    var login = new app.LoginView();
    this.$el.append(login.render().el);
  },
  renderSearch: function(){
    //TODO: Create nutrition search
  },
  renderTimeline: function(){
    //TODO: Create timeline
  }
});
