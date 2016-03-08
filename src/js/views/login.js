var app = app || {};

app.LoginView = Backbone.View.extend({
  tag: 'div',
  loginTemplate: _.template($('.login-template').html()),
  STATUS: {
    newLogin: 'NEWLOGIN',
    success: 'SUCCESS',
    error: {
      invalid: 'INVALID',
      userExists: 'USEREXISTS'
    }
  },
  state: null,
  events: {
    'submit form': 'addUser'
  },
  userRef: null,
  initialize: function(){
    // Sets the state of the login

    // Returns null if user is not authenticated
    var firebaseUrl = 'https://br-health-tracker.firebaseio.com';
    this.userRef = new Firebase(firebaseUrl);
    var userAuth = this.userRef.getAuth();

    console.log(userAuth);

    this.userRef.unauth();

    if(userAuth === null){
      this.model = new app.User();
    }else {
      this.model = new app.User({
        id: userAuth.uid,
        username: userAuth.username
      });
    }
    this.render();
  },
  render: function(){
    this.$el.html(this.loginTemplate());
    return this;
  },
  addUser: function(){
    var self = this;
    var username = $('#userName', this.$el).val();
    this.userRef.authAnonymously(function(error, authData) {
      if (error) {
        // Do I check for errors here or in the validation rules for the
        // database?
        console.log("Login Failed!", error);
      } else {
        // self.userRef.child("users").child(authData.uid).set({
        //   provider: authData.provider,
        //   username: username
        // });
        self.model.set({
          id: authData.uid,
          provider: authData.provider,
          username: username
        });
        console.log("Authenticated successfully with payload:", authData);
      }
    });
  }
});
