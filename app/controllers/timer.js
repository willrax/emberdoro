import Ember from "ember";

export default Ember.ObjectController.extend({
  completedPomodoros: [1],
  timerRunning: false,
  counter: 10000,
  time: null,
  clickingClass: "",
  showPause: false,
  stopPulse: "",

  timerProgress: function() {
    var progress = ((this.get("counter") / 10000) * 100);
    return "progress-" + Math.round(100 - progress);
  }.property("counter"),

  runTimer: function() {
    Ember.run.later(this, function() {
      var controller = this;

      if (this.get("timerRunning")) {
        var difference = moment().diff(this.get("time"));
        this.set("counter", this.get("counter") - difference);
        this.set("time", moment());

        if (this.get("counter") <= 0) {
          controller.completePomodoro();
        } else {
          controller.runTimer();
        }
      }
    }, 1000);
  },

  completePomodoro: function() {
    this.send("stopTimer");
    this.get("completedPomodoros").pushObject(1);
    this.store.createRecord("pomodoro").save();

    var message = "";

    if (this.get("completedPomodoros").length % 4 === 0) {
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

  actions: {
    startTimer: function() {
      this.set("clickingClass", "animated zoomOut");
      Ember.run.later(this, function(){
        this.set("showPause", true);
        this.set("clickingClass", "animated zoomIn");
      }, 200);
      this.set("timerRunning", true);
      this.set("time", moment());
      this.runTimer();
    },

    pauseTimer: function() {
      this.set("clickingClass", "animated zoomOut");
      Ember.run.later(this, function(){
        this.set("showPause", false);
        this.set("clickingClass", "animated zoomIn");
      }, 200);
      this.set("timerRunning", false);
    },

    stopTimer: function() {
      if (this.get("showPause")) {
        this.send("pauseTimer");
      }
      this.set("stopPulse", "animated rubberBand");
      Ember.run.later(this, function(){
        this.set("stopPulse", "");
      }, 500);
      this.set("timerRunning", false);
      this.set("counter", 10000);
    }
  }
});
