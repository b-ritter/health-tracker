var app = app || {};

app.LoginView = Backbone.View.extend({
  tag: 'div',
  loginTemplate: _.template($('.login-template').html()),
  events: {
    'submit form': 'addUser'
  },
  initialize: function(){
    // Sets the state of the login

    // Returns null if user is not authenticated
    // Catch authenticated users to bypass login screen
    var firebaseUrl = 'https://br-health-tracker.firebaseio.com';
    this.userRef = new Firebase(firebaseUrl);

    // Sets up the Users collection
    this.collection = new app.Users();

    this.userAuth = this.userRef.getAuth();

    //
    this.userRef.unauth();

  },
  render: function(){
    this.$el.html(this.loginTemplate());
    return this;
  },
  addUser: function(){
    var self = this,
    username = $('#userName', this.$el).val(),
    usersRef = new Firebase(this.collection.url);

    usersRef.child(username).transaction(function(currentUserData) {
      if(currentUserData === null) {
        self.userRef.authAnonymously(function(error, authData) {
          self.collection.add({
            id: username,
            provider: authData.provider
          });
        });
        self.trigger('authenticated');
      } else {
        // TODO: More elegant solution here
        alert('Username "' + username +  '" already exists. Please try again.');
      }
    });
  },
  isAuthenticated: function(){
    if( this.userAuth ){
      return true;
    } else {
      return false;
    }
  }
});
