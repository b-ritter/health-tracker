var app = app || {};

app.Days = Backbone.Firebase.Collection.extend({
  model: app.Day,
  comparator: function(day){
  	return -day.get('id');
  },
  initialize: function(attributes, options){
    this.url = 'https://br-health-tracker.firebaseio.com/timelines/' + options.uid;
  }
});
