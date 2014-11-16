import Ember from "ember";
import DS from "ember-data";

export default DS.Model.extend({
  title: DS.attr("string"),
  isCompleted: DS.attr("boolean"),
  createdAt: DS.attr("date"),

  notCompleted: Ember.computed.not("isCompleted")
});
