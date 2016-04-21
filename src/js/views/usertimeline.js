var app = app || {};

app.UserTimelineView = Backbone.View.extend({
  el: '.ht-user-timeline',

  userTemplate: _.template($('.user-template').html()),

  initialize: function(options){

    this.parent = options.parent;

    // Users can either be logged in with an id from local storage
    // or they can generate a new id on login

    this.currentUserId =  this.parent.login.currentUser.id;

    this.daysCollection = new app.Days( null, { uid: this.currentUserId });
    

  },

  render: function(){
    var self = this;
    this.menu = new app.MenuView({ parent: this });
    this.menu.render();

    this.daily = new app.DailyView({ parent: this });
    this.listenToOnce(this.daysCollection, 'sync', function(){
      self.$el.append(self.daily.render().el);
    });

    return this;
  }
  
});
