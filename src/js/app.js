var ref = new Firebase("https://br-health-tracker.firebaseio.com");

var userExists = ref.getAuth();

if(!userExists){
  ref.authAnonymously(function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      ref.child("users").child(authData.uid).set({
        provider: authData.provider
      });
      console.log("Authenticated successfully with payload:", authData);
    }
  });
}
