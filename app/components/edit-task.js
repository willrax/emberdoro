import Ember from "ember";

export default Ember.TextField.extend({
  focusIn: function() {
    this.$().focus();
  }.on('didInsertElement')
});
