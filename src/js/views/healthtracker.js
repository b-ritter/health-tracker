var app = app || {};

app.HealthTrackerView = Backbone.View.extend({
  // The main app view
  el: '.ht-app',
  loader: $($('.loader-template').html()),
  events: {
    'click .edit-user': 'editUser'
  },

  initialize: function(){
    
    var self = this;

    this.login = new app.LoginView({ parent: this }); 

    this.$timelineContainer = this.$el.find('.ht-timeline-container');

    this.listenTo(this.login, 'authenticated', function(){
      self.renderTimeline();
      self.renderUser();
    });

    if(!this.login.isAuthenticated()){
      this.renderLogin();
    } else {
      
      this.$el.append(this.loader);
    }
  },

  renderLogin: function(){
    this.login.$el.append(this.login.render().el);
  },

  renderUser: function() {

    var currentUserView = new app.UserView({
      model: this.login.currentUser
    });

    currentUserView.render();
  },

  renderTimeline: function(){
    this.loader.remove();
    this.login.$el.remove();
    this.userTimeline = new app.UserTimelineView({ parent: this });
    this.$userTimelineContainer = $('.ht-user-timeline');
    this.$userTimelineContainer.append(this.userTimeline.render(this.login.currentUser).el);
  }, 

  setCurrentTimeline: function(event){  
    this.currentTimeline = event;
    this.showTimeline(this.currentTimeline);
  },

  showTimeline: function(event){
    // var timeframe = $(event.currentTarget).data('timeframe');
    // this.$timelineContainer.empty().html(this.userTimeline.render(timeframe));
    // switch(timeframe){
    //   case 'daily':
    //     this.$timelineContainer.html(this.userTimeline.daily.render());
    //     break;
    //   case 'weekly':
    //     this.$timelineContainer.html(this.userTimeline.weekly.render());
    //     break;
    // } 
  }


});
