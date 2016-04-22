var app = app || {};

/**
* @description Contains the weekly and daily views of the user timeline
* @constructor
*/
app.UserTimelineView = Backbone.View.extend({
  class: '.ht-timeline-views',

  userTemplate: _.template($('.user-template').html()),

  initialize: function(options){

    this.parent = options.parent;

    // Users can either be logged in with an id from local storage
    // or they can generate a new id on login

    this.currentUserId =  this.parent.login.currentUser.id;
    
    this.showDaily();

  },

  render: function(){
    var self = this;
    // Attaches a menu view to the timeline
    // The menu view controls the display of the 
    // weekly and daily views
    this.menu = new app.MenuView({ parent: this });
    this.menu.render();
    return this;
  }, 

  showDaily: function(){
    var self = this;
    this.cleanUpOldViews();
    this.$el.empty();

    this.daily = new app.DailyView({ parent: this });
    // Only render the complete list of days into 
    // the DOM once. When days are added or deleted
    // there are separate functions to handle that. 
    // See addDay in this object and removeDay in day.js
    this.listenToOnce(this.daily.daysCollection, 'sync', function(){
      self.$el.append(self.daily.render().el);
    });
  },

  showWeekly: function(){
    var self = this;
    this.cleanUpOldViews();
    this.$el.empty();
    this.weekly = new app.WeeklyView({ parent: this });
    // See above. The same applies to the weekly view
    this.listenToOnce(this.weekly.calorieTotals, 'sync', function(){
      self.$el.append(self.weekly.render().el);
    });
  }, 

  cleanUpOldViews: function(){
    // Kill the zombie views
    if(this.weekly){
      this.stopListening(this.weekly);
      this.weekly.remove();
    }

    if(this.daily){
      this.stopListening(this.daily);
      this.daily.remove();
    }
  },

  addDay: function(){
    // Adds a day model to the database
    // See daily.js for how the day gets added to the DOM
    var date = $('.add-day-input').val();
    if(date !== ''){
      var formattedDate = moment(date,'MM-DD-YYYY').format('YYYY-MM-DD');
      var day_exists = this.daily.daysCollection.get(formattedDate);
      if(!day_exists){
        this.daily.daysCollection.create({
          id: formattedDate
        });
        $('.add-day-input').val('');
      }
    }
  }
  
});
