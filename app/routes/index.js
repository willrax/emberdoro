import Ember from "ember";

export default Ember.Route.extend({
  renderTemplate: function() {
    this.render("timer", { outlet: "timer" });
    this.render("tasks", { outlet: "tasks", model: this.taskModel() });
  },

  taskModel: function() {
    return this.store.find("task");
  }
});
