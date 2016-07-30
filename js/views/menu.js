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
		this.parent.showDaily();
	},

	showWeekly: function(){
		this.parent.showWeekly();
	},

	addDay: function(){
		this.parent.addDay();
	}


});
