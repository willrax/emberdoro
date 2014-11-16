import Ember from "ember";

export default Ember.Controller.extend({
  requestNotificationPermission: function() {
    Notification.requestPermission( function(status) {
      console.log(status);
    });
  }.on("init")
});
