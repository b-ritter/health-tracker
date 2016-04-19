var app = app || {};

app.DayView = Backbone.View.extend({
  model: app.Day,
  dayTemplate: _.template($('.day-template').html()),
  loaderTemplate: $('.loader-template').html(),
  events: {
    'click .remove-day': function(){
      this.removeDay();
      this.removeItems();
    },
    'click .edit-day': 'editDay',
    'click .close-day': 'closeDay'
  },

  initialize: function(attrs){
    var self = this;

    this.parent = attrs.parent;

    this.is_editing = false;

    this.list = new app.List({ 
      uid: self.parent.parent.currentUserId,
      id: self.model.id
    });
  },
  
  render: function() {
    this.$el.html(this.dayTemplate(_.extend({ is_editing: this.is_editing }, this.model.attributes )));
    this.$calorieContainer = this.$el.find('.calorie-container');
    // TODO: Create a firebase data object for calories in day
    // The calorie model needs to update independently of the rest of the stuff in the day view
    this.calories = new app.CaloriesView({ parent: this });
    this.$calorieContainer.html(this.calories.render().el);
    this.$itemsContainer = this.$el.find('.item-list-container');
    this.itemUI = new app.ItemListUI({ parent: this });
    this.$uiContainer = this.$el.find('.item-list-ui');
    this.$uiContainer.html(this.itemUI.render().el);
    return this;
  },

  removeDay: function(){
    // Removes the day from the database
    var self = this;
      this.model.destroy({
        success: function(){
          self.remove();
        }
      });
  },

  removeItems: function(){
    this.itemsList.collection.reset();
  },

  editDay: function(){
    var self = this;

    this.itemUI.toggle();

    this.$uiContainer.html(this.itemUI.render().el);

    this.$itemsContainer.html(this.loaderTemplate);

    this.itemsList = new app.ItemsView( { 
      model: this.list, 
      parent: self
    });

    this.listenTo(this.itemsList.collection, 'sync', function(){
      self.$itemsContainer.empty().append(self.itemsList.render().el);
    });

    this.listenTo(this.itemsList.collection, 'update', function(){
      self.$calorieContainer.html(self.calories.renderCalories(this.itemsList.countCalories()).el);

    });
  },

  closeDay: function(){

    this.itemUI.toggle();

    this.$uiContainer.html(this.itemUI.render().el);

    var calcount = this.itemsList.countCalories();

    this.model.set({
      calories: calcount
    });

    this.itemsList.remove();


  }
});