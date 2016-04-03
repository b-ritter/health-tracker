var app = app || {};

app.WeeklyView = Backbone.View.extend({
  weeklyTemplate: _.template($('.weekly-template').html()),
  initialize: function(options){
    this.parent = options.parent;

    this.parent.daysCollection.fetch( { reset: true });

    this.listenTo(this.parent.daysCollection, 'add', this.renderDay);
    
    this.listenTo(this.parent.daysCollection, 'sync', this.render);
  },
  render: function(){
  	// Divide the data into weekly chunks
  	// Iterate through the list, drawing a chart for each
  	// Chart drawing should be a function that takes an array of calories

  	// Separate dates out into years
  	// Group dates by week of year

  	var days_in_year = this.parent.daysCollection.groupBy(function(day){
  		return day.id.substr(0,4);
  	});

  	// console.log(days_in_year);

  	_.each(days_in_year, function(year, index){
  		// console.log(year, '  ', index);
  		// console.log(days_in_year[index]);
  		days_in_year[index] = _.groupBy(year, function(day){
	  		return moment(day.id,'YYYY-MM-DD').week();
	  	});
  	});

  	console.log(days_in_year);

    return this.weeklyTemplate({ num_days: this.parent.daysCollection.length});
  }
});
