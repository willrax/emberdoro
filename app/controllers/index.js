import Ember from "ember";

export default Ember.Controller.extend({
  requestNotificationPermission: function() {
    if (!window.Notification === undefined) {
      Notification.requestPermission( function(status) {
        console.log(status);
      });
    }
  }.on("init")
});
