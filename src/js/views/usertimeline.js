var app = app || {};

app.UserTimelineView = Backbone.View.extend({
  el: '.ht-user-timeline',
  currentTimeline: 'daily',
  userTemplate: _.template($('.user-template').html()),
  events: {
    'click .edit-user': 'editUser',
    'click .daily': 'setCurrentTimeline',
    'click .weekly': 'setCurrentTimeline',
    'click .monthly': 'setCurrentTimeline',
  },

  initialize: function(options){

    this.parent = options.parent;

    // Users can either be logged in with an id from local storage
    // or they can generate a new id on login

    this.currentUserId =  this.parent.login.currentUser.id;

    this.collection = new app.Days( null, { uid: this.currentUserId });
    this.menu = new app.MenuView();
    this.daily = new app.DailyView({ parent: this });
    this.weekly = new app.WeeklyView({ parent: this });
    this.monthly = new app.MonthlyView({ parent: this });
    this.$timelineContaner = this.$el.find('.ht-timeline-container');
  },

  render: function(){
    var self = this;
    $('#ht-main-menu').append(this.menu.render().el);
    this.collection.on('sync', function(){
      self.showTimeline(self.currentTimeline);
    });
    return this;
  },

  showTimeline: function(event){
    var timeframe = $(event.currentTarget).attr('class');
    var content;
    switch(timeframe){
      case 'daily':
        console.log('daily');
        content = this.daily.render();
        break;
      case 'weekly':
        content = this.weekly.render();
        break;
      case 'monthly':
        content = this.monthly.render();
        break;
    }
    this.$timelineContaner.html(content);
  },

  setCurrentTimeline: function(timeframe){
    this.currentTimeline = timeframe;
    this.showTimeline(this.currentTimeline);
  },

  addDay: function(){
    this.parent.collection.add({
      id: moment().format('YYYY-MM-D')
    });
  }
});
