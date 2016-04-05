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

  	var self = this;
  	// First separate dates out into years

  	var weeks_by_year = {};

  	var years = [];

  	var days_in_year = this.parent.daysCollection.groupBy(function(day){
  		return day.id.substr(0,4);
  	});

  	// Then group dates by week of year
  	_.each(days_in_year, function(year, index){
  		weeks_by_year[index] = _.groupBy(year, function(day){
	  		return moment(day.id,'YYYY-MM-DD').week();
	  	});
  	});

  	for(var year in weeks_by_year){
  		// Logs '2015' and '2016'
  		// console.log(year);
  		// Logs the data for each year
  		// console.log(weeks_by_year[year]);
  		
  		// self.renderWeeks(year);
  		years.push(year);
  	}

    return this.weeklyTemplate({ num_days: this.parent.daysCollection.length, years: years });
  },

  renderWeeks: function(year){
  	// console.log(_.keys(year));
  	// var weekChart = new app.WeekView(week);
  	// this.$el.append(weekChart.render().el);
  }
});
