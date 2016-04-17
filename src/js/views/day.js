var app = app || {};

app.DayView = Backbone.View.extend({
  model: app.Day,
  dayTemplate: _.template($('.day-template').html()),
  events: {
    'click .add-item': 'addItem',
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
    this.$el.html(this.dayTemplate(_.extend(this.model.attributes, { is_editing: false })));
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
    // console.log(this.itemsList.model);
    this.itemsList.collection.reset();
  },

  editDay: function(){
    this.$el.html(this.dayTemplate(_.extend(this.model.attributes, { is_editing: true })));
    this.$el.find('.item-list-container').append(this.itemsList.render().el);
  },

  closeDay: function(){
    this.$el.html(this.dayTemplate(_.extend(this.model.attributes, { is_editing: false })));
  }



});