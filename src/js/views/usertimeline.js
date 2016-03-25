var app = app || {};

app.UserTimelineView = Backbone.View.extend({
  el: '.ht-user-timeline',
  currentTimeline: 'daily',
  userTemplate: _.template($('.user-template').html()),

  initialize: function(options){

    this.parent = options.parent;

    // Users can either be logged in with an id from local storage
    // or they can generate a new id on login

    this.currentUserId =  this.parent.login.currentUser.id;

    this.collection = new app.Days( null, { uid: this.currentUserId });
    this.daily = new app.DailyView({ parent: this });
    this.weekly = new app.WeeklyView({ parent: this });
    this.monthly = new app.MonthlyView({ parent: this });
    this.menu = new app.MenuView();
    
  },

  render: function(){
    var self = this;
    $('#ht-main-menu').append(this.menu.render().el);
    
    return this;
  },

  setCurrentTimeline: function(timeframe){
    this.currentTimeline = timeframe;
    this.showTimeline(this.currentTimeline);
  }
  
});
