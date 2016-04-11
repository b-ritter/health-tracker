var app = app || {};

app.WeekView = Backbone.View.extend({
	model: app.Week,
	className: 'row',
	weekTemplate: _.template($('.week-template').html()),
	yearTemplate: _.template($('.year-template').html()),
	chartTemplate: _.template($('.chart-template').html()),
	initialize: function(data){
		// Logs the data by week
		this.data = data;
	},
	render: function(){
		// Iterate through the weeks in the year, building a d3 chart for each
		var self = this;

		_.each(this.data, function( year, index, list ){
			var yearIndex = index;
			self.$el.append(self.yearTemplate({ year: index }));
			_.each(year, function( week, index ){
				// Each week is an array of days
				// The index is the number value of a week in a year
				self.$el.append(self.weekTemplate({ weekIndex: index, yearIndex: yearIndex }));

				// Create an array of calorie data to chart
				var daysInWeek = [];
				for(var i = 0; i < 7; i++){
					daysInWeek.push(0);
				}

				week.forEach(function(day){
					var day_of_week = moment(day.id, 'YYYY-MM-DD').format('d');
					daysInWeek[day_of_week] = day.attributes.calories;
				});
			
				// Correctly logs the amount of calories in that week
				// console.log(daysInWeek);

				var margin = {top: 20, right: 20, bottom: 20, left: 60},
				    width = 700 - margin.left - margin.right,
				    height = 200 - margin.top - margin.bottom,
				    CHART_SCALE_FACTOR = 0.75; 

				var x = d3.scale.linear()
				    .range([0, width]);

				var y = d3.scale.linear()
					.domain([0, d3.max(daysInWeek)])
				    .range([height * CHART_SCALE_FACTOR, 0]);


				var yAxis = d3.svg.axis()
				    .scale(y)
				    .ticks(5)
				    .tickSize(1)
				    .orient("left");

				var days;

				var svg = d3.select(self.el).append('div').attr('class', 'row')
					.append('div').attr('class', 'small-10 columns small-centered')
					.append('svg')
		            .attr('viewBox', '0 0 ' + width + ' ' + height)
			        .append('g')
		            .attr('transform', 'translate('+ margin.left +',' + margin.top + ')')
		            .append('g')
		            .attr('class', 'y axis')
		            .call(yAxis);

				// Number of days in week - 1
				var point_spacing = width / 6; 

				var lineFunction = d3.svg.line()
					  .x(function(d, i) { return point_spacing * i ; })
					  .y(function(d) { console.log(y(d)); return y(d); })
					  .interpolate('linear');

				svg.append('path')
					.attr('d', lineFunction(daysInWeek))
					.attr('stroke', 'blue')
					.attr('fill', 'none');

			});
		});
		
		return this;
	}
});