var app = app || {};

/** @description A list of total calories for each day
*	@constructor
*/
app.CalorieTotals = Backbone.Firebase.Collection.extend({
  initialize: function(attributes, options){
    this.url = 'https://br-health-tracker.firebaseio.com/calorietotals/' + options.uid;
  }
});