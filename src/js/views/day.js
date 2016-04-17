var app = app || {};

app.DayView = Backbone.View.extend({
  model: app.Day,
  dayTemplate: _.template($('.day-template').html()),
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

    this.model.on('all', function(){
      this.render();
    }, this);

    this.list = new app.List({ 
      uid: self.parent.parent.currentUserId,
      id: self.model.id
    });

    this.itemsList = new app.ItemsView( { 
      model: this.list, 
      parent: self
    });
  },
  
  render: function() {
    this.$el.html(this.dayTemplate(_.extend({ is_editing: this.is_editing }, this.model.attributes )));
    if(this.is_editing){
      this.$el.find('.item-list-container').append(this.itemsList.render().el);
    }
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
    this.is_editing = true;
    this.render();
  },

  closeDay: function(){
    this.is_editing = false;
    this.render();
  },

  updateCalories: function(){
    this.render();
  }
});