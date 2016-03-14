var app = app || {};

app.LoginView = Backbone.View.extend({
  el: '.ht-login-form',
  loginTemplate: _.template($('.login-template').html()),
  collection: new app.Users(),
  currentUser: new app.User(),
  events: {
    'submit form': 'addUser',
  },
  initialize: function(){
    // Sets the state of the login
    // Returns null if user is not authenticated
    // Catch authenticated users to bypass login screen
    var self = this,
    firebaseUrl = 'https://br-health-tracker.firebaseio.com';
    this.userRef = new Firebase(firebaseUrl);

    this.userAuth = this.userRef.getAuth();

    if(this.isAuthenticated()){
      this.collection.on('sync', function(){
        self.currentUser.set(self.collection.get(self.userAuth.uid));
        self.trigger('authenticated');
      });
    }

    //
    // this.userRef.unauth();
    // console.log(this.userAuth);

  },
  render: function(){
    this.$el.append(this.loginTemplate());
    return this;
  },
  addUser: function(){
    var self = this,
    username = $('#userName', this.$el).val();
    self.userRef.authAnonymously(function(error, authData) {
      self.collection.add({
        id: authData.uid,
        username: username,
        provider: authData.provider
      });
      self.currentUser.set(self.collection.get(authData.uid));
      self.trigger('authenticated');
    });
  },
  setUser: function(){


  },
  isAuthenticated: function(){
    if( this.userAuth ){
      return true;
    } else {
      return false;
    }
  }
});
