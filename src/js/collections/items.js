var app = app || {};

app.Items = Backbone.Firebase.Collection.extend({
  model: app.Item,
  initialize: function(attributes, options){
    this.url = 'https://br-health-tracker.firebaseio.com/timelines/' + options.uid + '/items'
  }
});