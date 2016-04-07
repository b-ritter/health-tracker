var app = app || {};

app.WeekView = Backbone.View.extend({
	model: app.Week,
	className: 'row',
	weekTemplate: _.template($('.week-template').html()),
	yearTemplate: _.template($('.year-template').html()),
	initialize: function(data){
		// Logs the data by week
		this.data = data;
	},
	render: function(){
		// Iterate through the weeks in the year, building a d3 chart for each
		var self = this;



		console.log(this.data);

		_.each(this.data, function( year, index, list ){
			var yearIndex = index;
			self.$el.append(self.yearTemplate({ year: index }));
			_.each(year, function( weeks, index ){
				self.$el.append(self.weekTemplate({ weekIndex: index, yearIndex: yearIndex }));
			});
			
		});
		
		return this;
	}
});