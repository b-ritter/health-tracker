var app = app || {};

app.WeeklyView = Backbone.View.extend({
	class: 'weekly',
  weeklyTemplate: _.template($('.weekly-template').html()),
  initialize: function(options){
    this.parent = options.parent;

    this.calorieTotals = new app.CalorieTotals(null, {
    	uid: this.parent.currentUserId
    });

    this.calorieTotals.fetch( { reset: true });

    this.listenTo(this.calorieTotals, 'sync', this.update);

    this.weeks_by_year = {};

    // TODO: Sync this to the calorie collection instead of days
    // How did I solve the problem? Reflect.
  },

  update: function(){

  	var self = this;

  	// Organize the days by year
  	// this.calorieTotals.each(function(day){
  	// 	console.log(day);
  	// });

	this.days_in_year = this.calorieTotals.groupBy(function(day){
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
    	num_days: this.calorieTotals.length
	}));

    if( this.calorieTotals.length > 0 ){

		var $week_container = self.$el.find( '.weeks' );

	    var weekCharts = new app.WeekView( self.weeks_by_year );

	    $week_container.append(weekCharts.render().el);
    }

  	return this;
  }
});
