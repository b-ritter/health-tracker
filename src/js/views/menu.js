var app = app || {};

app.MenuView = Backbone.View.extend({
	el: '#ht-main-menu',
	menuTemplate: _.template($('.menu-template').html()),
	bottomBarTemplate: _.template($('.bottom-bar-template').html()),
	render: function(){
		this.$el.append(this.menuTemplate());
		this.$el.find('.add-day-input').datepicker();
		$('footer').append(this.bottomBarTemplate());
		$('.daily').trigger('click');
		return this;
	}
});
