var app = app || {};

app.HealthTrackerView = Backbone.View.extend({
  // The main app view
  el: '.ht-app',
  loader: $($('.loader-template').html()),
  events: {
    'click .edit-user': 'editUser',
    'click .daily': 'setCurrentTimeline',
    'click .weekly': 'setCurrentTimeline',
    'click .monthly': 'setCurrentTimeline',
    'click .add-day': 'addDay'
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
    console.log(this.login.currentUser);
    currentUserView.render();
  },

  renderTimeline: function(){
    this.loader.remove();
    this.login.$el.remove();
    this.userTimeline = new app.UserTimelineView({ parent: this });
    this.userTimeline.$el.append(this.userTimeline.render(this.login.currentUser).el);
  }, 

  setCurrentTimeline: function(timeframe){  
    this.currentTimeline = timeframe;
    this.showTimeline(this.currentTimeline);
  },

  showTimeline: function(event){
    var timeframe = $(event.currentTarget).data('timeframe');
    var content;
    switch(timeframe){
      case 'daily':
        content = this.userTimeline.daily.render();
        break;
      case 'weekly':
        content = this.userTimeline.weekly.render();
        break;
      case 'monthly':
        content = this.userTimeline.monthly.render();
        break;
    }

    this.$timelineContainer.html(content);
  },

  renderInterface: function(){
    // Insert timeline controls in menu and footer
  },

  addDay: function(){
    var date = $('.add-day-input').val();

    this.userTimeline.collection.add({
      id: moment(date,'MM-DD-YYYY').format('YYYY-MM-DD'),
      calories: 0
    });
  }


});
