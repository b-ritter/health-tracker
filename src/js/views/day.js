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

    this.calorieTotal = new app.CalorieTotal(null, {
      uid: self.parent.parent.currentUserId,
      id: self.model.id
    });

  },

  render: function() {
    var self = this;
    this.$el.html(this.dayTemplate(_.extend({ is_editing: this.is_editing }, this.model.attributes )));
    this.$calorieContainer = this.$el.find('.calorie-container');

    this.calories = new app.CaloriesView({
      model: this.calorieTotal
    });

    this.listenTo(this.calorieTotal, 'sync', function(){
      self.$calorieContainer.append(self.calories.render().el);
    });

    this.$itemsContainer = this.$el.find('.item-list-container');
    this.itemUI = new app.ItemListUI({ parent: this });
    this.$uiContainer = this.$el.find('.item-list-ui');
    this.$uiContainer.html(this.itemUI.render().el);
    return this;
  },

  updateCalorieTotal: function(){
    this.$calorieContainer.html(this.calories.render().el);
  },

  removeDay: function(){
    // Removes the day from the database

    // Get rid of the view right away
    // This could be probelmatic if the models could not be destroyed
    this.remove();

    this.calories.model.destroy();

    this.model.destroy();

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
      var total = this.itemsList.countCalories();
      this.calorieTotal.set({
        calories: total
      });
    });

  },

  closeDay: function(){

    this.itemUI.toggle();

    this.$uiContainer.html(this.itemUI.render().el);

    this.itemsList.remove();

  }
});