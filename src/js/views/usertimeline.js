var app = app || {};

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
    this.menu = new app.MenuView({ parent: this });
    this.menu.render();
    return this;
  }, 

  showDaily: function(){
    var self = this;
    if(this.daily){
      this.stopListening(this.daily);
      this.daily.remove();
    }
    this.$el.empty();
    this.daily = new app.DailyView({ parent: this });
    this.listenToOnce(this.daily.daysCollection, 'sync', function(){
      self.$el.append(self.daily.render().el);
    });
  },

  showWeekly: function(){
    var self = this;
    this.$el.empty();
    this.weekly = new app.WeeklyView({ parent: this });
    this.listenTo(this.weekly.calorieTotals, 'sync', function(){
      self.$el.append(self.weekly.render().el);
    });
  }, 

  addDay: function(){
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
