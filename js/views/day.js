var app = app || {};

/**
* @description The view of the day itself
* @constructor
*/

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

    // Find the calorie container within the rendered template
    this.$calorieContainer = this.$el.find('.calorie-container');

    // Find the container for the list of items
    this.$itemsContainer = this.$el.find('.item-list-container');

    // Container for the ui
    this.$uiContainer = this.$el.find('.item-list-ui');

    // A separate view for the total calories of each day
    this.calories = new app.CaloriesView({
      model: this.calorieTotal
    });

    // Live update the total number of calories
    this.listenTo(this.calorieTotal, 'sync', function(){
      self.$calorieContainer.append(self.calories.render().el);
    });

    // A separate view for the ui to control the day
    this.itemUI = new app.ItemListUI({ parent: this });
    
    this.$uiContainer.html(this.itemUI.render().el);
    return this;
  },

  updateCalorieTotal: function(){
    this.$calorieContainer.html(this.calories.render().el);
  },

  removeDay: function(){
    // Removes the day from the database
    var self = this;

    // Prevent the calorie view from trying to render without a model
    this.stopListening(this.calorieTotal);

    // When both the day model and calorie model are deleted,
    // then remove their bound elements from the DOM
    $.when(
      this.calories.model.destroy(),
      this.model.destroy()).done(function(){
        self.remove();
      }).fail(function(){
        alert('There was a problem deleting this day. Please refresh your broweser and try again if necessary.');
        }
      );
  },

  removeItems: function(){
    // Make sure the collection of items are removed when a day is deleted
    this.itemsList.collection.reset();
  },

  editDay: function(){
    var self = this;

    this.itemUI.toggle();

    this.$uiContainer.html(this.itemUI.render().el);

    this.$itemsContainer.html(this.loaderTemplate);

    // The list of items gets created each time
    // the edit day button is clicked
    this.itemsList = new app.ItemsView( { 
      model: this.list, 
      parent: self
    });

    this.listenTo(this.itemsList.collection, 'sync', function(){
      self.$itemsContainer.empty().append(self.itemsList.render().el);
    });

    // Update the total calories when an item is added
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