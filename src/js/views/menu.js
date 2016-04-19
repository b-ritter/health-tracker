var app = app || {};

app.MenuView = Backbone.View.extend({
	el: '#ht-main-menu',
	menuTemplate: _.template($('.menu-template').html()),
	bottomBarTemplate: _.template($('.bottom-bar-template').html()),
	events: {
		'click .daily': 'showDaily',
		'click .weekly': 'showWeekly',
		'click .add-day': 'addDay'
	},
	initialize: function(options){
		this.parent = options.parent;
	},

	render: function(){
		this.$el.append(this.menuTemplate());
		this.$el.find('.add-day-input').datepicker();
		$('footer').append(this.bottomBarTemplate());
		// $('.daily').trigger('click');
		return this;
	},

	showDaily: function(){
		var self = this;
		this.parent.$el.empty().append(self.parent.daily.$el);
	},

	showWeekly: function(){
		var self = this;
		if(!this.parent.weekly){
			this.parent.weekly = new app.WeeklyView({ parent: this.parent });
			this.listenTo(this.parent.daysCollection, 'sync', function(){
				self.parent.$el.empty().append(self.parent.weekly.render().el);
			});
			
		} else {
			this.parent.$el.empty().append(self.parent.weekly.$el);
		}
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
      }
    }
    

  }
});
