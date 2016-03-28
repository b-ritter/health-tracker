var app = app || {};

app.Days = Backbone.Firebase.Collection.extend({
  model: app.Day,
  comparator: function(day){
  	var daycode = day.get('id').replace(/-/g,"");
  	return -1 * +daycode;
  },
  initialize: function(attributes, options){
    this.url = 'https://br-health-tracker.firebaseio.com/timelines/' + options.uid;
  }
});
