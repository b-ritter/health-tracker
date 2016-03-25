var app = app || {};

app.HealthTrackerView = Backbone.View.extend({
  // The main app view
  loader: $($('.loader-template').html()),

  initialize: function(){
    
    var self = this;

    this.login = new app.LoginView({ parent: this }); 

    this.listenTo(this.login, 'authenticated', function(){
      self.renderTimeline();
      self.renderUser();
    });

    if(!this.login.isAuthenticated()){
      this.renderLogin();
    } else {
      this.$el.append(this.loader);
    }
  },

  renderLogin: function(){
    this.login.$el.append(this.login.render().el);
  },

  renderUser: function() {

    var currentUserView = new app.UserView({
      model: this.login.currentUser
    });

    console.log(currentUserView.render().el);
  },

  renderTimeline: function(){
    this.loader.remove();
    this.login.$el.remove();
    this.userTimeline = new app.UserTimelineView({ parent: this });
    this.userTimeline.$el.append(this.userTimeline.render(this.login.currentUser).el);
  }, 

  renderInterface: function(){
    // Insert timeline controls in menu and footer
  }


});
