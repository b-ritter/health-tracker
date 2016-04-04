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

  	// First separate dates out into years

  	var weeks_in_year = {};

  	var days_in_year = this.parent.daysCollection.groupBy(function(day){
  		return day.id.substr(0,4);
  	});

  	// Then group dates by week of year
  	_.each(days_in_year, function(year, index){
  		weeks_in_year[index] = _.groupBy(year, function(day){
	  		return moment(day.id,'YYYY-MM-DD').week();
	  	});
  	});

  	// Each week in the year will have its own chart
  	console.log(weeks_in_year);

    return this.weeklyTemplate({ num_days: this.parent.daysCollection.length});
  }
});
