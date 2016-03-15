var app = app || {};

app.UserTimelineView = Backbone.View.extend({
  el: '.ht-user-timeline',
  $timelineContainer: null,
  currentTimeline: 'daily',
  menu: new app.MenuView(),
  userTemplate: _.template($('.user-template').html()),
  events: {
    'click .edit-user': 'editUser',
    'click .daily': 'setCurrentTimeline',
    'click .weekly': 'setCurrentTimeline',
    'click .monthly': 'setCurrentTimeline',
  },
  initialize: function(options){
    this.parent = options.parent;
    this.currentUserId = this.parent.login.userAuth.uid;
    this.collection = new app.Days( null, { uid: this.currentUserId });
    this.day = new app.DayView({ parent: this });
    this.weekly = new app.WeeklyView({ parent: this });
    this.monthly = new app.MonthlyView({ parent: this });
    this.$timelineContaner = this.$el.find('.ht-timeline-container');
  },
  render: function(userAttributes){
    var self = this;
    this.$el.find('.ht-usercontrol').append(this.userTemplate({ username: userAttributes.username }));
    this.$el.find('.ht-menu').append(this.menu.render().el);
    this.collection.on('sync', function(){
      self.showTimeline(self.currentTimeline);
    });
    return this;
  },
  editUser: function(){
    console.log('edit user');
  },
  showTimeline: function(event){
    var timeframe = $(event.currentTarget).attr('class');
    var content;
    switch(timeframe){
      case 'daily':
        content = this.day.render();
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
  }
});
