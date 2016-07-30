var app = app || {};

/** @description A list of users by id
*	@constructor
*/
app.Users = Backbone.Firebase.Collection.extend({
  model: app.User,
  url: 'https://br-health-tracker.firebaseio.com/users'
});
