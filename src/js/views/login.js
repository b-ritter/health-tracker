var app = app || {};

app.LoginView = Backbone.View.extend({
  el: '.ht-login-form',
  loginTemplate: _.template($('.login-template').html()),
  collection: new app.Users(),
  events: {
    'submit form': 'addUser',
  },
  initialize: function(options){
    // Sets the state of the login
    // Returns null if user is not authenticated
    // Catch authenticated users to bypass login screen
    var self = this;
    this.parent = options.parent;
    var firebaseUrl = 'https://br-health-tracker.firebaseio.com';
    this.userRef = new Firebase(firebaseUrl);

    this.userAuth = this.userRef.getAuth();

    if(this.isAuthenticated()){
      this.collection.on('sync', function(){
        self.currentUser = self.collection.get(self.userAuth.uid).attributes;
        self.trigger('authenticated');
      });
    }

    //
    // this.userRef.unauth();

  },
  render: function(){
    this.$el.append(this.loginTemplate());
    return this;
  },

  setUser: function(user){
    this.currentUser = user;
    this.trigger('authenticated');
  },

  addUser: function(){

    var self = this,
    username = $('#userName', this.$el).val();
    this.userRef.authAnonymously(function(error, authData) {
      var userModel = self.collection.create({
        id: authData.uid,
        username: username,
        provider: authData.provider
      });

      self.listenTo( self.collection, 'add', self.setUser(userModel) );

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
