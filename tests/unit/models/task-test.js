import Ember from "ember";
import DS from "ember-data";
import { test, moduleForModel } from "ember-qunit";
var task;

moduleForModel("task", "Unit - TaskModel", {
  setup: function() {
    task = this.subject({ title: "A task", isCompleted: false, createdAt: Date() });
  }
});

test("Task is a valid ember-data model", function() {
  ok(task);
  ok(task instanceof DS.Model);
});

test("notCompleted returns true", function() {
  equal(task.get("notCompleted"), true);
});
