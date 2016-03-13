var app = app || {};

app.Days = Backbone.Firebase.Collection.extend({
  model: app.Day,
  url: 'https://br-health-tracker.firebaseio.com/timelines'
});
