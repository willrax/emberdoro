import Ember from "ember";

export default Ember.Component.extend({
  isEditing: false,

  actions: {
    editTask: function() {
      this.set("isEditing", true);
    },

    removeTask: function() {
      var model = this.get("model");
      model.destroyRecord();
      model.save();
    },

    acceptChanges: function() {
      this.set("isEditing", false);

      if (Ember.isEmpty(this.get("model.title"))) {
        Ember.run.debounce(this, "send", "removeTask", 100);
      } else {
        this.get("model").save();
      }
    }
  },

  isCompleted: function(key, value) {
    var model = this.get("model");

    if (value === undefined) {
      return model.get("isCompleted");
    } else {
      model.set("isCompleted", value);
      model.save();
      return value;
    }
  }.property("model.isCompleted"),
});
