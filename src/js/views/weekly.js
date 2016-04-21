var app = app || {};

app.WeeklyView = Backbone.View.extend({
  weeklyTemplate: _.template($('.weekly-template').html()),
  initialize: function(options){
    this.parent = options.parent;

    this.parent.daysCollection.fetch( { reset: true });

    this.listenTo(this.parent.daysCollection, 'sync', this.update);

    this.weeks_by_year = {};

    // TODO: Sync this to the calorie collection instead of days
  },

  update: function(){

  	var self = this;

  	// Organize the days by year
	this.days_in_year = this.parent.daysCollection.groupBy(function(day){
  		return -1 * day.id.substr(0,4);
  	});

	// Organize the days in each year into weeks
  	_.each(this.days_in_year, function(year, index){
  		self.weeks_by_year[index] = _.groupBy(year, function(day){
	  		return -1 * moment(day.id,'YYYY-MM-DD').week();
	  	});
  	});

  },

  render: function(){

  	var self = this;

  	// Structure of this.weeks_by_year object
  	/*
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
    	num_days: this.parent.daysCollection.length
	}));

    if( this.parent.daysCollection.length > 0 ){

		var $week_container = self.$el.find( '.weeks' );

	    var weekCharts = new app.WeekView( self.weeks_by_year );

	    $week_container.append(weekCharts.render().el);
    }

  	return this;
  }
});
