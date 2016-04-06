var app = app || {};

app.HealthTrackerView = Backbone.View.extend({
  // The main app view
  el: '.ht-app',
  loader: $($('.loader-template').html()),
  events: {
    'click .edit-user': 'editUser',
    'click .daily': 'setCurrentTimeline',
    'click .weekly': 'setCurrentTimeline',
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

    currentUserView.render();
  },

  renderTimeline: function(){
    this.loader.remove();
    this.login.$el.remove();
    this.userTimeline = new app.UserTimelineView({ parent: this });
    this.userTimeline.$el.append(this.userTimeline.render(this.login.currentUser).el);
  }, 

  setCurrentTimeline: function(event){  
    this.currentTimeline = event;
    this.showTimeline(this.currentTimeline);
  },

  showTimeline: function(event){
    var timeframe = $(event.currentTarget).data('timeframe');
    switch(timeframe){
      case 'daily':
        this.$timelineContainer.html(this.userTimeline.daily.render());
        break;
      case 'weekly':
        this.$timelineContainer.html(this.userTimeline.weekly.render());
        break;
    } 
  },

  renderInterface: function(){
    // Insert timeline controls in menu and footer
  },

  addDay: function(){
    var date = $('.add-day-input').val();

    if(date !== ''){
      var formattedDate = moment(date,'MM-DD-YYYY').format('YYYY-MM-DD');
      var day_exists = this.userTimeline.daysCollection.get(formattedDate);
      if(!day_exists){
        this.userTimeline.daysCollection.create({
        id: formattedDate,
        calories: 0
      });
      }
    }
    

  }


});
