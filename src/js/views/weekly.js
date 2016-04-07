var app = app || {};

app.WeeklyView = Backbone.View.extend({
  weeklyTemplate: _.template($('.weekly-template').html()),
  initialize: function(options){
    this.parent = options.parent;

    this.parent.daysCollection.fetch( { reset: true });

    this.listenTo(this.parent.daysCollection, 'sync', this.update);

    this.weeks_by_year = {};

  },

  update: function(){

  	var self = this;

  	// Organize the days by year
	this.days_in_year = this.parent.daysCollection.groupBy(function(day){
  		return day.id.substr(0,4);
  	});

	// Organize the days in each year into weeks
  	_.each(this.days_in_year, function(year, index){
  		self.weeks_by_year[index] = _.groupBy(year, function(day){
	  		return moment(day.id,'YYYY-MM-DD').week();
	  	});
  	});

  },

  render: function(){

  	var self = this;
  	// First separate dates out into years
  	/*
  	// this.weeks_by_year structure
	yearID: {
		weekID: [ 
			{ 
				attributes: {
					calories: x,
					id: "YYYY-MM-DD"
				}
			},
			{
				attributes: {
					calories: x,
					id: "YYYY-MM-DD"
				}
			}
		]
	},
	yearID: {
		....
	}
  	*/

    this.$el.html(this.weeklyTemplate({ 
    	num_days: this.parent.daysCollection.length, 
    	years: this.weeks_by_year })
    );

  	_.each(this.weeks_by_year, function(yearData, index, list){
  		var $week_container = self.$el.find('.' + index + '-weeks');
  		// Logs the data for each year
  		// console.log(yearData);
  		var weekChart = new app.WeekView(yearData);
  		console.log(weekChart.render().el);
  		$week_container.append(weekChart.render().el);
  	});

  	return this.$el;
  }
});
