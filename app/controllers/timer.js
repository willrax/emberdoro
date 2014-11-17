import Ember from "ember";

export default Ember.Controller.extend({
  completedPomodoros: 0,
  timerRunning: false,
  currentTime: null,
  clickingClass: "",
  counter: 1500000,
  stopPulse: "",
  paused: true,

  timerProgress: function() {
    var progress = ((this.get("counter") / 1500000) * 100);
    return "progress-" + Math.round(100 - progress);
  }.property("counter"),

  actions: {
    startTimer: function() {
      this.set("timerRunning", true);
      this.set("currentTime", moment());
    },

    pauseTimer: function() {
      this.set("timerRunning", false);
    },

    stopTimer: function() {
      if (this.get("paused")) {
        this.send("pauseTimer");
      }
      this.set("stopPulse", "animated rubberBand");
      this.set("timerRunning", false);
      this.set("counter", 1500000);
    }
  },

  completePomodoro: function() {
    this.set("completedPomodoros", this.get("completedPomodoros") + 1);
    this.store.createRecord("pomodoro").save();
    this.send("stopTimer");

    var message;

    if (this.get("completedPomodoros") % 4 === 0) {
      message = "30 minute break.";
    } else {
      message = "5 minute break.";
    }

    this.sendNotification(message);
    sweetAlert("Neat.", message);
  },

  sendNotification: function(message) {
    new Notification("Pomodoro Complete", { body: "Take a" + " " + message });
  },

  runTimer: function() {
    Ember.run.later(this, function() {
      var controller = this;

      if (this.get("timerRunning")) {
        var difference = moment().diff(this.get("currentTime"));
        this.set("counter", this.get("counter") - difference);

        if (this.get("counter") <= 0) {
          controller.completePomodoro();
        } else {
          this.set("currentTime", moment());
        }
      }
    }, 1000);
  }.observes("currentTime"),

  toggleTimerPauseControl: function() {
    this.set("clickingClass", "animated zoomOut");

    if (this.get("paused")) {
      Ember.run.later(this, function(){
        this.set("paused", false);
      }, 200);
    } else {
      Ember.run.later(this, function(){
        this.set("paused", true);
      }, 200);
    }
  }.observes("timerRunning"),

  fadeInTimerControl: function() {
    this.set("clickingClass", "animated zoomIn");
  }.observes("paused"),

  clearStopButtonAnimation: function() {
    Ember.run.later(this, function() {
      this.set("stopPulse", "");
    }, 200);
  }.observes("stopPulse")
});
