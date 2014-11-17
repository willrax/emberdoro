import Ember from "ember";

export default Ember.Controller.extend({
  fields: {},

  incompleteTasks: Ember.computed.filter("model", function(task) {
    return task.get("notCompleted");
  }).property("model.@each.isCompleted"),

  completedTasks: Ember.computed.filter("model", function(task) {
    return task.get("isCompleted");
  }).property("model.@each.isCompleted"),

  actions: {
    clearCompleted: function() {
      this.get("completedTasks").forEach(function(task) {
        Ember.run.once(this, function() {
          task.deleteRecord();
          task.save();
        });
      });
    },

    createTask: function() {
      var newTask = this.store.createRecord("task", this.get("fields"));
      newTask.set("isCompleted", false);
      newTask.set("createdAt", moment().toString());
      this.set("fields", {});
      newTask.save();
    }
  }
});
