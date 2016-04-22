var app = app || {};

app.CalorieTotals = Backbone.Firebase.Collection.extend({
  initialize: function(attributes, options){
    this.url = 'https://br-health-tracker.firebaseio.com/calorietotals/' + options.uid;
  }
});