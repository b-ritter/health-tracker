var app = app || {};

app.DayView = Backbone.View.extend({
  el: '.ht-timeline-container',
  dayTemplate: _.template($('.day-template').html()),
  defaults: {
    day: moment().format('dddd, MMMM D YYYY'),
    item: null
  },
  events: {
    'click .add-day': 'addDay',
    'click .add-item': 'addItem'
  },
  initialize: function(options){
    this.parent = options.parent;
  },
  render: function(){
    return this.dayTemplate( this.model || this.defaults );
  },
  addDay: function(){
    // var m = moment().format('YYYY-MM-D');
    // console.log(m);
    // console.log(moment(m, 'YYYY-MM-D').format('dddd, MMMM D YYYY'));
    this.parent.collection.add({
      id: moment().format('YYYY-MM-D')
    });
  },
  addItem: function(){
    // console.log(this.parent.collection.model);
    this.parent.collection.add({
      id: moment().format('YYYY-MM-D'),
      food: ['juice']
    });
  }
});
