import Ember from "ember";
import DS from "ember-data";
import { test, moduleForModel } from "ember-qunit";
var pomodoro;

moduleForModel("pomodoro", "Unit - PomodoroModel", {
  setup: function() {
    pomodoro = this.subject({ createdAt: Date() });
  }
});

test("Pomodoro is a valid ember-data model", function() {
  ok(pomodoro);
  ok(pomodoro instanceof DS.Model);
});
