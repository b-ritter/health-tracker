var app = app || {};

/**
* @description The main Health Tracker app view
* @constructor
*
*/

app.HealthTrackerView = Backbone.View.extend({
  // Bind to the body element
  el: '.ht-app',
  loader: $($('.loader-template').html()),
  events: {
    'click .edit-user': 'editUser'
  },

  initialize: function(){
    
    var self = this;

    // The login view
    this.login = new app.LoginView({ parent: this }); 

    // 'authenticated' is a custom event fired by login view
    this.listenTo(this.login, 'authenticated', function(){
      // When the user is authenticated, render the user's
      // timeline and username
      self.renderTimeline();
      self.renderUser();
    });

    if(!this.login.isAuthenticated()){
      // If the user isn't authenticated, render the form
      // to sign them up
      this.renderLogin();
    } else {
      this.$el.append(this.loader);
    }
  },

  renderLogin: function(){
    // Puts the login template into the DOM
    this.login.$el.append(this.login.render().el);
  },

  renderUser: function() {
    var currentUserView = new app.UserView({
      model: this.login.currentUser
    });

    currentUserView.render();
  },

  renderTimeline: function(){
    this.loader.remove();
    this.login.$el.remove();
    this.userTimeline = new app.UserTimelineView({ parent: this });
    this.$userTimelineContainer = $('.ht-user-timeline');
    this.$userTimelineContainer.append(this.userTimeline.render(this.login.currentUser).el);
  }

});
