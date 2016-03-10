var app = app || {};

app.Users = Backbone.Firebase.Collection.extend({
  model: app.User,
  url: 'https://br-health-tracker.firebaseio.com/users'
});
