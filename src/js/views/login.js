var Login = Backbone.View.extend({
  el: '',
  model: User,
  STATUS: {
    newLogin: 'NEWLOGIN',
    success: 'SUCCESS',
    error: {
      invalid: 'INVALID',
      userExists: 'USEREXISTS'
    }
  },
  state: null,
  initialize: function(){
    // Sets the state of the login
    var userRef = new Firebase(this.model.url),
    // Returns null if user is not authenticated
    isNewUser = userRef.getAuth();
    if(isNewUser === null){
      userRef.authAnonymously(function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          userRef.child("users").child(authData.uid).set({
            provider: authData.provider
          });
          console.log("Authenticated successfully with payload:", authData);
        }
      });
    }else {
      this.state = this.STATUS.success;
    }
  },
  render: function(){

  }
});
