import Ember from "ember";

export default Ember.Controller.extend({
  completedPomodoros: 0,
  timerRunning: false,
  currentTime: null,
  clickingClass: "",
  counter: 1500000,
  stopPulse: "",

  timerProgress: function() {
    var progress = ((this.get("counter") / 1500000) * 100);
    return "progress-" + Math.round(100 - progress);
  }.property("counter"),

  actions: {
    startTimer: function() {
      this.set("timerRunning", true);
      this.set("currentTime", moment());
      this.runTimer();
    },

    pauseTimer: function() {
      this.set("timerRunning", false);
    },

    stopTimer: function() {
      this.animateStopButton();
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
      if (this.get("timerRunning")) {
        var difference = moment().diff(this.get("currentTime"));
        this.set("counter", this.get("counter") - difference);

        if (this.get("counter") <= 0) {
          this.completePomodoro();
        } else {
          this.set("currentTime", moment());
          this.runTimer();
        }
      }
    }, 1000);
  },

  animateStopButton: function() {
    this.set("stopPulse", "animated rubberBand");

    Ember.run.later(this, function() {
      this.set("stopPulse", "");
    }, 200);
  },

  animatePlayPauseButton: function() {
    this.set("clickingClass", "animated zoomIn");

    if (this.get("timerRunning")) {
      Ember.run.later(this, function(){
        this.set("clickingClass", "");
      }, 200);
    } else {
      Ember.run.later(this, function(){
        this.set("clickingClass", "");
      }, 200);
    }
  }.observes("timerRunning"),
});
