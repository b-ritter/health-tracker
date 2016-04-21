var app = app || {};

app.MenuView = Backbone.View.extend({
	el: '.ht-app',
	menuTemplate: _.template($('.menu-template').html()),
	bottomBarTemplate: _.template($('.bottom-bar-template').html()),
	events: {
		'click .daily': 'showDaily',
		'click .weekly': 'showWeekly',
		'click .add-day': 'addDay'
	},
	initialize: function(options){
		this.parent = options.parent;
		this.$topMenuContainer = $('#ht-main-menu');
	},

	render: function(){
		this.$topMenuContainer.append(this.menuTemplate());
		this.$topMenuContainer.find('.add-day-input').datepicker();
		this.$el.find('footer').append(this.bottomBarTemplate());
		return this;
	},

	showDaily: function(){
		var self = this;
		this.parent.$el.empty();
		if(this.parent.weekly){
			this.parent.weekly.remove();
		}
		this.parent.weekly = new app.DailyView({ parent: this.parent });
		this.listenTo(this.parent.daysCollection, 'sync', function(){
			self.parent.$el.append(self.parent.daily.render().el);
		});
	},

	showWeekly: function(){
		var self = this;
		this.parent.$el.empty();
		if(this.parent.daily){
			this.parent.daily.remove();
		}
		this.parent.weekly = new app.WeeklyView({ parent: this.parent });
		this.listenTo(this.parent.daysCollection, 'sync', function(){
			self.parent.$el.append(self.parent.weekly.render().el);
		});
			
	
	}, 

	addDay: function(){
	    var date = $('.add-day-input').val();

	    if(date !== ''){
	      var formattedDate = moment(date,'MM-DD-YYYY').format('YYYY-MM-DD');
	      var day_exists = this.parent.daysCollection.get(formattedDate);
	      if(!day_exists){
	        this.parent.daysCollection.create({
	          id: formattedDate
	        });
	        $('.add-day-input').val('');
	      }
	    }
    

  }
});
